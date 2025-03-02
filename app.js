import inquirer from 'inquirer';
import qr from 'qr-image';
import path from 'path';
import fs from 'fs';

const outputDir = './image';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// using the inquirer package
inquirer
    .prompt([
        /* Pass your questions in here */

        {
            "message": "Type in your url",
            "name": "url",
        }
    ])
    .then((answers) => {
        const url = answers.url;

        // Define output file path
        const outputPath = path.join(outputDir, 'qr_image.png');

        // using the qr-image package
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream(outputPath));
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log(error);
        } else {
            console.log("try later");
        }
    });


