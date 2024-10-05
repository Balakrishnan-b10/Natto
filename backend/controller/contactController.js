import Contact from '../model/Contact.js';

// Handle contact form submission (POST)
export const submitContactForm = async (req, res) => {
  try {
    const { help, fullName, email, phone, message } = req.body;

    // Create a new contact entry
    const newContact = new Contact({
      help,
      fullName,
      email,
      phone,
      message,
    });

    // Save to the database
    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: savedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while submitting the form.',
      error: error.message,
    });
  }
};

// Handle fetching all contact form submissions (GET)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Get all contacts, sorted by most recent
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving contacts.',
      error: error.message,
    });
  }
};
