const express = require('express');

const app = express();

const PORT=3000;

app.get('/', (req,res) => {
    res.send("Thank you for reaching us")
});

app.listen(PORT, () => {
    console.log(`App API is running on port ${PORT}`);
})