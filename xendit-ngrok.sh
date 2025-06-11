#!/bin/bash
set -e
current_dir="$(pwd)"

name="$1"
httpCountFailed=0
maxHttpCountFailed=10
recurringWebhooksPath="/api/webhooks/xendit/recurring-webhook"

function print_error() {
    printf "\033[1;31m%s\033[0m" "$1"
}

function print_info() {
    printf "\033[1;32m%s\033[0m\n" "$1"
}

function exitf(){
    print_error "$1"
    exit 1
}

function print_help() {
    echo "Usage: ./xendit-ngrok.sh start [ngrok] [PORT]"
    echo ""
    echo "This script is used during development to:"
    echo "  - Start ngrok tunneling"
    echo "  - Checking local and remote URLs"
    echo "  - Update Xendit recurring callback URL"
    echo ""
    echo "Arguments to passed:"
    echo "  start                                 Entry command to run the script"
    echo "  ngrok                                 (Optional) Start ngrok tunnel. If ngrok is already running, you can skip this."
    echo "  PORT                                  (Optional) Local port (e.g., 3000). Required if starting ngrok."
    echo ""
    echo "Environment Variables (required in .env):"
    echo "  NODE_ENV                               (Optional) But if has, need to set to 'development'"
    echo "  NGROK_API_KEY                          Your ngrok API key"
    echo "  XENDIT_PASSWORD                        Xendit password"
    echo ""
    echo "Examples:"
    echo "  ./xendit-ngrok.sh start ngrok 3000     # Starts ngrok on port 3000"
    echo "  ./xendit-ngrok.sh start                # Just update recurring URL if ngrok is already running"
    echo "  ./xendit-ngrok.sh --help               # Show this help message"
    exit 0
}

function UpdateRecurringUrl() {
    url="$1$recurringWebhooksPath";
    curl https://api.xendit.co/callback_urls/recurring -X POST \
    -u "$NEXT_PUBLIC_XENDIT_SECRET_KEY:$XENDIT_PASSWORD" \
    -H 'Content-Type: application/json' \
    -d "{\"url\": \""$url"\"}"
}

function MakeHTTPCall() {
    description=$2
    url=$1

    print_info "$description"
    while true; do
        HTTPCALL="$(curl -s $url || echo "Failed")"
        sleep 3
        if [ "$HTTPCALL" == "Failed" ];then
            httpCountFailed=$((httpCountFailed + 1))
            print_error "Failed to connect: $httpCountFailed"
            echo ""
            if [ $httpCountFailed == $maxHttpCountFailed ];then
                echo "Stoping Http Call, hitting max calls: $maxHttpCountFailed"
                exit 1
            fi
        else
            print_info "Success to connect"
            break
        fi
    done
}

function ngrokFn() {
   address=http://localhost:$1
   sleep 2
   echo "Wait for $address to be available"
   MakeHTTPCall "$address" "CALLING $address"

   sleep 2
   echo "⚡️ Starting ngrok"
   ngrok http $address > /dev/null &
   
   sleep 2
   NGROK_PID="$!"
   echo "NGROK_PID=$!" > "ngrok-pid.txt"
   print_info "NGROK PROCESS ID => $NGROK_PID"
   echo "To stop manually do:"
   echo "On bash terminal => kill $NGROK_PID"
}


function start() {
    if [ "$1" == "ngrok" ]; then
        if [[ $2 =~ ^[0-9]+$ ]]; then
            ngrokFn $2
        else
            exitf "Port: $2 is not a number"
        fi
    fi

    sleep 5
    echo "Requesting NGROK Tunnels"
    TUNNELS="$(curl -s \
                -X GET \
                -H "Authorization: Bearer ${NGROK_API_KEY}" \
                -H "Ngrok-Version: 2" \
                https://api.ngrok.com/tunnels)"

    echo "Results NGROK TUNNELS: $TUNNELS"

    echo ""

    NGROK_REMOTE_URL=$(echo "$TUNNELS" | grep -o '"public_url":"[^"]*"' | head -n1 | sed -n 's/.*"public_url":"\([^"]*\)".*/\1/p')
    MakeHTTPCall "$NGROK_REMOTE_URL" "CALLING: $NGROK_REMOTE_URL"

    echo ""

    print_info "Updating Recurring URL to '$NGROK_REMOTE_URL'"
    echo "Warning: This only uses the first public_url if tunnels result in more than one"
    UpdateRecurringUrl "$NGROK_REMOTE_URL" || exitf "Failed to update recurring url"
}


trapProcessCommand() {
    echo ""
    echo ""
    echo "Command:"
    echo "  stop                                  Command to stop ngrok process and exit terminal"
    echo "  check-pid                             Command to check ngrok pid if runs or not"
    echo "  --help                                view command"
    echo ""
    echo "Start enter you command bellow or just exit directly by doing CTRL+C however this stops ngrok too"
}

trapProcess() {
    trapProcessCommand
    while true; do
        read -rp "Enter commnad: " user_input
        user_input=$(echo "$user_input" | tr '[:upper:]' '[:lower:]')

        if [ "$user_input" == "stop" ]; then
            NGROK_PID=$(cat "ngrok-pid.txt" | cut -d'=' -f2) || exitf "unable to extract pid on nrok-pid.txt file"
            kill "$NGROK_PID" || exitf "Unable to stop ngrok pid. eithier missing or wrong usage"
            print_info "ngrok stopped..."
            exit 0
        elif [ "$user_input" == "check-pid" ]; then
            echo "PID ALL"
            echo "========================"
            ps aux
            echo ""
            echo "NGROK PID"
            echo "========================"
            ps aux | grep ngrok
        elif [ "$user_input" == "--help" ]; then
            trapProcessCommand
        else 
            echo "Invalid command"
        fi

        sleep 1
    done
}

onInterrupt() {
    echo "Caught Ctrl+C (SIGINT)"
    echo "Do you really want to exit? (y/n): " 
    read -r user_input
    user_input=$(echo "$user_input")
    if [[ "$user_input" =~ ^[Yy]$ ]]; then
        echo "Exiting..."
        exit 0
    else
        echo "Continuing..."
        trapProcess
    fi
}

source .env || exitf "Missing .env file"

NODE_ENV="$NODE_ENV"

NGROK_API_KEY="$NGROK_API_KEY"

XENDIT_PASSWORD="$XENDIT_PASSWORD"

NEXT_PUBLIC_XENDIT_SECRET_KEY="$NEXT_PUBLIC_XENDIT_SECRET_KEY"

if [ ! -n "$NODE_ENV" ]; then
    print_info "MISING env value NODE_ENV. This treat as development environment"
elif [ -n  "$NODE_ENV" ] && [ "$NODE_ENV" != "development" ]; then
    exitf "NODE_ENV is not in development, Only use this script during development"
fi

if [ ! -n "$NGROK_API_KEY" ]; then
    exitf "MISING env value NGROK_API_KEY"
fi

if [ ! -n "$XENDIT_PASSWORD" ]; then
    exitf "MISING env value XENDIT_PASSWORD"
fi

if [ ! -n "$NEXT_PUBLIC_XENDIT_SECRET_KEY" ]; then
    exitf "MISING env value NEXT_PUBLIC_XENDIT_SECRET_KEY"
fi

if [ "$name" == "--help" ]; then
  print_help
elif [ "$name" == "start" ]; then
  start $2 $3 
elif [[ "$name" =~ ^.*help.* ]]; then
  print_info "Did you mean '--help' ?"
  exit 0
else
    exitf "Invalid/No argument. Do '--help'"
fi


trap onInterrupt SIGINT 
trapProcess