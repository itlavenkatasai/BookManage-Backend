import mongoose from "mongoose";

// Helper function to format a date to 'yyyy-mm-dd'
function formatDate(date) {
    const d = new Date(date);
    let day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    const year = d.getFullYear();

    if (day.length < 2) day = '0' + day;
    if (month.length < 2) month = '0' + month;

    return [year, month, day].join("-");
}

// Book schema with custom setter and getter for the year field
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: {
        type: Date,
        set: function (value) {
            // Convert to Date object and store only the date part
            return new Date(formatDate(value));
        },
        get: function (value) {
            // Format date to 'yyyy-mm-dd' when retrieving
            return formatDate(value);
        }
    },
    userId: { type: String, required: true }
}, { 
    toJSON: { getters: true }, 
    toObject: { getters: true } 
});

export const Book = mongoose.model('Books', bookSchema);