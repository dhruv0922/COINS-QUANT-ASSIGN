import express from "express";
import nodemailer from "nodemailer";
import util from "util";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/email", async (req, res) => {
  const { recipients, subjectIn, body } = req.body;
  sendMail(recipients, subjectIn, body).then((d) => {
    res.send(200)
  }).catch((e) => {
    res.send(400)
  });
});

async function sendMail(recipients, subjectIn, body) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "shahdhruv446@gmail.com",
        pass: "yngo bqrj iluf pnkb",
      },
    });

    const mailOptions = {
      from: "shahdhruv446@gmail.com",
      to: recipients,
      subject: subjectIn,
      text: body,
    };

    // Convert transporter.sendMail to a promise-based operation
    const sendMailPromise = util
      .promisify(transporter.sendMail)
      .bind(transporter);

    // Use try-catch for async operations
    const info = await sendMailPromise(mailOptions);
    console.log("Email sent:", info.response);
    return info; // Return some data to indicate success if needed
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // Rethrow the error for proper handling in calling function
  }
}

const port = 3000; // Choose your desired port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

