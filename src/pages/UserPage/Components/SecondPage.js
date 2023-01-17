import React from "react";

const SecondPage = () => {
  return (
    <div className="general_form">
      <form action="" method="POST">
        <div className="upload_inputs">
          <div className="json_file">
            <label>Json</label>
            <input type="file" name="json"></input>
          </div>
          <div className="session_file">
            <label>Session</label>
            <input type="file" name="session"></input>
          </div>
        </div>
        <div className="text_inputs">
          <input type="text" name="ip"></input>
          <input type="text" name="port"></input>
          <input type="text" name="user"></input>
          <input type="text" name="pwd"></input>
        </div>
        <div className="submit_inputs">
          <input type="submit" value="Проверить прокиси (Check proxy)"></input>
        </div>
      </form>
    </div>
  );
};

export default SecondPage;
