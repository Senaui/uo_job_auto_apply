# uOttawa Job Application Automation
This project automates the job application process on the uOttawa school website. It uses Puppeteer to handle browser automation, logs into the uOttawa portal, and allows for automated interactions such as filling out login forms and applying for jobs.

### Features
- **Automated Login**: Automatically fills in the user's email, password, and two-factor authentication key using Puppeteer.
- **Screen Recording and Screenshots**: Takes screenshots and records the browser session for debugging and reference.
- **Job Application Navigation**: Automatically navigates to the uOttawa job application portal and prepares for job applications.
- **Two-Factor Authentication Support**: Utilizes the otplib library to generate one-time authentication codes for secure login.
### Prerequisites
- Node.js (v14 or higher recommended)
- Puppeteer for browser automation.
- otplib for generating two-factor authentication tokens.
- dotenv for securely managing environment variables.
### Installing Dependencies
You can install the required dependencies by running:


`npm install puppeteer otplib dotenv Environment Variables`

Create a .env file in the root directory of the project with the following entries:

```
email={your_uottawa_email}
password={your_uottawa_password}
authkey={your_authentication_key}
```
These environment variables will be used for login.

### Usage
#### Running the Automation Script
1. Start the automation script: After setting up the environment, you can run the script by executing:

```
node applyPuppeteer.js
```
2. Automated Actions:

- The script will open a browser using Puppeteer and navigate to the uOttawa login page.
- It will input your email, password, and one-time authentication key to log in.
- After login, the script navigates to the uOttawa job application page and prepares for job application tasks.
### Screenshots and Recording
The script automatically takes screenshots and records the browser session, which is useful for debugging and reviewing the automation process. Screenshots are saved in the project directory with filenames based on page titles.

### Customization
- **Login Actions**: The login function can be customized to handle additional authentication mechanisms.
- **Job Application Logic**: You can modify the startApply function to implement specific logic for job applications (e.g., filtering jobs, filling out forms).
### Code Structure

### Future Improvements
- Implement job filters to apply only to relevant jobs.
- Add error handling for potential login issues, like CAPTCHA.
- Automate the entire job application process once inside the portal.
- Schedule the script to run at regular intervals and notify users when new jobs are available.
### License
This project is **NOT** licensed under the any license.