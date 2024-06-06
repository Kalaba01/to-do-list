import React from 'react';
import "./TodoFooter.css";

const TodoFooter = ({ t }) => {
  return (
    <footer className="TodoFooter">
      {t("todoFooter.footer")}<img src="https://www.hulkapps.com/cdn/shop/files/square_favicon_32x32.svg?v=1700475708" alt='hulkapps-logo' />
    </footer>
  )
}

export default TodoFooter;
