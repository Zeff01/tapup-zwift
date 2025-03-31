<h1 align="left">
TAPU-ZWIFT
</h1>
 
<p align="left">
TAPUP is an innovative app that serves as a digital portfolio for business card holders. It replaces traditional printed business cards with a dynamic and interactive solution.
</p>

---


## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js

You should also be familiar with:  
- TypeScript  

### Setup Steps
Follow these steps to get the project up and running on your local machine:

1. Clone the project from the Github 'tapup-fe' main branch (dev). Copy the clone link.

```bash
  e.g. https://github.com/Zeff01/tapup-zwift
```

2. Open your target folder where you want to clone the project, then right-click and open your Terminal (Command Prompt/Powershell/Gitbash). Enter the following command plus the clone link to execute.

```bash
git clone https://github.com/Zeff01/tapup-zwift
```

3. Change directory to the project folder.

```bash
cd tapup-zwift
```

4. Install the dependencies.

```bash
npm i
```

or

```bash
npm install
```

5. **Environment Configuration**:
   Obtain the `.env.local` files for production from the system administrator. These files contain sensitive configuration details such as API keys and database credentials.

   Example `.env.local` file:
   ```env
   NEXT_PUBLIC_API_KEY="******************"
   NEXT_PUBLIC_AUTH_DOMAIN="tapup-*****.firebaseapp.com"
   ```

6. Start the server to test if the website is functional.

```bash
npm run dev
```

7. A localhost link will be provided in the terminal. In case the website does not open automatically in the browser, use the localhost link to open it manually in the browser.

```bash
  e.g. http://localhost:3000/
```

8. To stop the server, type the following shortcut key: ctrl + 'C', then press 'Y' after the specified command is shown in the terminal.

```bash
  e.g. ^C^CTerminate batch job (Y/N)?
```

---

## Further Reading
For more detailed information, please refer to the following sections in our wiki:

| Topic                | Description                                                                 | Link                                                                          |
|----------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Contributing         | Commit and pull request guidelines                                          | https://github.com/Zeff01/tapup-zwift/wiki/Contributing-and-Commit-Guidelines |
| Folder Structure     | Overview of the project's directories and their purposes.                   | https://github.com/Zeff01/tapup-zwift/wiki/Folder-Structure                   |
| Tech Stack           | Core technologies and tools used in the project.                            | https://github.com/Zeff01/tapup-zwift/wiki/Tech-Stack                         |
| VSCode Extensions    | Recommended extensions to for development.                                  | https://github.com/Zeff01/tapup-zwift/wiki/VSC-Code-Extensions                |







