import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// --- 1. INITIALIZE EXPRESS APP ---
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

// --- 2. DATABASE CONNECTION ---
// Reusing the connection string. Data will be stored in a new collection.
const MONGO_URI = 'mongodb+srv://ionode:ionode@ionode.qgqbadm.mongodb.net/ConveyorBeltBreakdownSys?retryWrites=true&w=majority&appName=ionode';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- 3. MONGOOSE SCHEMA DEFINITION ---
// Defines the structure for the solar panel data in the database. 
const solarPanelSchema = new mongoose.Schema({
    voltage: { type: Number, default: 0 },
    current: { type: Number, default: 0 },
    power: { type: Number, default: 0 },
    energyToday: { type: Number, default: 0 },
    avgPower: { type: Number, default: 0 },
    avgVoltage: { type: Number, default: 0 },
    efficiency: { type: Number, default: 0 },
    temperature: { type: Number, default: 0 },
    dustStatus: {
        status: { type: String, default: 'Clean' }, // Renamed from 'type' to avoid conflict
        dustLevel: { type: Number, default: 0 }
    }
}, {
    // Automatically add `createdAt` and `updatedAt` timestamps
    timestamps: true
});

// --- 4. MONGOOSE MODEL CREATION ---
// This will create a 'solarpanels' collection in your database.
const SolarPanel = mongoose.model('SolarPanel', solarPanelSchema);


// --- 5. API ROUTES ---

// Welcome Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Solar Panel monitoring server is working. Use /solar-data to interact with the API." });
});


/**
 * @route   POST /solar-data
 * @desc    Create or update the solar panel data.
 * @access  Public
 * @body    JSON object with solar panel data fields.
 *
 * @example To CREATE or UPDATE data:
 * POST http://localhost:62888/solar-data
 * Body: { "temperature": 35.5, "efficiency": 0.85, "dustStatus": { "status": "Dusty", "dustLevel": 4 } }
 */
app.post('/solar-data', async (req, res) => {
    try {
        // The data to update comes from the request body.
        const updateData = req.body;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty." });
        }

        // `findOneAndUpdate` with `upsert: true` is perfect for a monitoring system.
        // It will update the single document representing the panel's state,
        // or create it if it doesn't exist yet.
        const updatedPanelData = await SolarPanel.findOneAndUpdate({}, updateData, {
            new: true, // Return the modified document
            upsert: true, // Create a new document if one doesn't exist
            setDefaultsOnInsert: true // Apply schema defaults on creation
        });

        res.status(200).json({
            message: "Data created/updated successfully.",
            data: updatedPanelData
        });

    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ message: "Failed to update data.", error: error.message });
    }
});


/**
 * @route   GET /solar-data
 * @desc    Fetch the latest solar panel data.
 * @access  Public
 *
 * @example To FETCH data:
 * GET http://localhost:62888/solar-data
 */
app.get('/solar-data', async (req, res) => {
    try {
        // Find the single document for the solar panel.
        // Sorting by `updatedAt` ensures you get the latest state if you ever have more than one.
        const panelData = await SolarPanel.findOne().sort({ updatedAt: -1 });

        if (!panelData) {
            return res.status(404).json({ message: "No data found. Please POST data to create an entry." });
        }

        res.status(200).json({
            message: "Data fetched successfully.",
            data: panelData
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Failed to fetch data.", error: error.message });
    }
});


// --- 6. START SERVER ---
const port = 62888; // Using a new port to avoid conflicts
app.listen(port, () => {
    console.log(`Solar Panel server is live on port: ${port}`);
});