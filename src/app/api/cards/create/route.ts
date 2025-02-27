import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body to get the number of cards to create
        const { numberOfCards } = await req.json();

        // Validate the input to ensure it's a positive integer
        if (isNaN(numberOfCards) || numberOfCards <= 0) {
            return NextResponse.json(
                { error: "Please provide a valid number of cards to create." },
                { status: 400 }
            );
        }

        // Define the blank card template
        const blankCard = {
            owner: "",
            expiryDate: null,
            id: "",
            coverPhotoUrl: "",
            profilePictureUrl: "",
            position: "",
            company: "",
            companyBackground: "",
            serviceDescription: "",
            servicePhotos: [],
            chosenTemplate: "",
            chosenPhysicalCard: "",
            firstName: "",
            lastName: "",
            email: "",
            number: "",
            facebookUrl: "",
            youtubeUrl: "",
            instagramUrl: "",
            twitterUrl: "",
            linkedinUrl: "",
            whatsappNumber: "",
            skypeInviteUrl: "",
            websiteUrl: "",
            printStatus: false,
            userCode: "",
            user_link: "",
        };

        // Create the requested number of cards
        const createdCardIds: string[] = [];
        for (let i = 0; i < numberOfCards; i++) {
            const cardId = crypto.randomUUID();
            const transferCode = crypto.randomUUID().split('-').slice(0, 2).join('-');
            const cardRef = doc(firebaseDb, "cards", cardId);
            await setDoc(cardRef, { ...blankCard, id: cardId, transferCode });
            createdCardIds.push(cardId);
        }

        console.log(`${numberOfCards} blank cards created with IDs: ${createdCardIds.join(", ")}`);

        return NextResponse.json(
            { message: `${numberOfCards} cards created successfully`, createdCardIds },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating blank cards:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}