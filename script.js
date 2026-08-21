body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 50px auto;
    padding: 35px;
    background: #f4f1ea;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

h1 {
    text-align: center;
    margin-bottom: 5px;
    font-size: 36px;
}

#date {
    text-align: center;
    color: #777;
    margin-top: 0;
    margin-bottom: 30px;
}

body > button {
    display: block;
    margin: 0 auto 25px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

#taskList {
    margin-top: 20px;
}

label {
    display: flex;
    align-items: center;
    gap: 10px;
    background: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 10px;
}

.taskText {
    flex: 1;
    border: none;
    outline: none;
    font-size: 18px;
    background: transparent;
    min-width: 0;
}

label button {
    padding: 7px 10px;
    font-size: 13px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

input[type="checkbox"] {
    transform: scale(1.2);
}
