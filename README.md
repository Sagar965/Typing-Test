# TypingPro ⌨️

TypingPro is a full-stack web application designed to help users improve their typing speed and accuracy. It features a clean, modern interface, configurable test modes, and user accounts to track long-term progress.  
This project was built using **Flask** for the backend and **Vanilla JavaScript** for a responsive frontend experience.


## ✨ Features

### 🧑‍💻 Guest Mode

Anyone can start practicing immediately without needing an account.

### 👤 User Accounts

Register and log in to save your test results and track your progress over time.

### ⚙️ Configurable Tests

Customize your practice sessions with options for:

- **Mode:** Time-based or word-count-based tests
- **Duration/Length:** Choose from 15, 30, 60, or 120 seconds/words
- **Punctuation & Numbers:** Toggle special characters for a greater challenge
- **Casing:** Practice with lowercase, uppercase first letters, or default text

### ⌨️ Real-time Feedback

- Instant color-coded feedback (green/red) for correct and incorrect characters
- A focused 3-line view with auto-scrolling to keep you in the flow

### 📊 Personal Stats Page

Logged-in users get a dedicated page with a chart visualizing their **WPM** and **accuracy** history.


## 💻 Technologies Used

### Backend:

- Python 3
- Flask
- Flask-SQLAlchemy _(for database ORM)_
- Flask-Login _(for session management)_
- Werkzeug _(for password hashing)_

### Frontend:

- HTML5
- CSS3
- JavaScript _(Vanilla JS)_
- Bootstrap 5
- Chart.js _(for data visualization)_

### Database:

- SQLite


## 🚀 Setup and Installation

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Create a virtual environment:

```bash
# For Windows
python -m venv venv
.\venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install the dependencies:

```bash
pip install Flask Flask-SQLAlchemy Flask-Login Werkzeug
```
### 4. Create the word list file:

Create a file named `words.txt` in the root directory. 
Populate it with a list of common words, one word per line.

### 5. Run the application:

```bash
python app.py
```

The application will be available at `http://127.0.0.1:5000.`

## 📸 Demo

**Configure Your Test:** Use the options at the top to select your desired mode, duration, and text modifiers.  
![Configure](https://github.com/Sagar965/Typing-Test/blob/main/images/Configure.png)

**Start Typing:** The test begins as soon as you type the first character. You will see live feedback and a blinking cursor.  
![Typing](https://github.com/Sagar965/Typing-Test/blob/main/images/Typing.png)

**View Results:** Once the test is complete, your final WPM and accuracy are displayed. If you are logged in, the result is automatically saved.  
![Results](https://github.com/Sagar965/Typing-Test/blob/main/images/Results.png)

**Track Progress:** Logged-in users can visit the "Stats" page to see a chart of their performance over time.  
![Stats](https://github.com/Sagar965/Typing-Test/blob/main/images/Stats.png)
