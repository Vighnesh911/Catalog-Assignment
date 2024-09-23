const fs = require('fs');

// Function to decode the y values based on the provided base
function decodeValue(base, value) {
    return parseInt(value, base);  // Convert value to base 10
}

// Function to perform Lagrange Interpolation
function lagrangeInterpolation(points) {
    let constantTerm = 0; // This will store the result
    let n = points.length;

    for (let i = 0; i < n; i++) {
        let xi = points[i].x;  // x value
        let yi = points[i].y;  // y value
        console.log(xi)
        console.log(yi)
        
        let li = 1;  
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (0 - points[j].x) / (xi - points[j].x); 
            }
        }

       
        constantTerm += yi * li;
    }

    return constantTerm;
}

// Main function to find the constant term 'c'
function findConstantTerm(fileName) {
    // Step 1: Read and parse the JSON input file
    let data = JSON.parse(fs.readFileSync(fileName, 'utf8'));

    let n = data.keys.n;  // Number of points provided
    let k = data.keys.k;  // Minimum number of points required

    let points = [];  // This will hold the (x, y) points

    // Step 2: Decode the y values
    for (let key in data) {
        if (key !== 'keys') {
            let base = parseInt(data[key].base);  // Get the base of the y value
            let value = data[key].value;  // Get the encoded y value
            let x = parseInt(key);  // The key itself is the x value
            let y = decodeValue(base, value);  // Decode the y value
            points.push({ x, y });  // Add the point (x, y)
        }
    }

    // Step 3: Only use the first 'k' points (if there are more than needed)
    points = points.slice(0, k);

    // Step 4: Calculate the constant term using Lagrange interpolation
    let constantTerm = lagrangeInterpolation(points);

    // Output the result
    console.log("The constant term 'c' is:", constantTerm);
}

// Call the function with the JSON input file
findConstantTerm('testcase.json');
