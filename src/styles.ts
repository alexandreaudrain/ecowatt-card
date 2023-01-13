import { css } from 'lit';

export const styles = css`
    .days-container {
      display: flex;
      width: 90%;
      margin: auto;
    }
    .day-container {
      float: left;
      width: 25%;
    }
    .day {
      border-radius: 10px;
      padding: 10px;
      margin: 2px;
      text-align: center;
      font-weight: bold;
      color: white;
      /* transition */
      transition: 0.3s;
    }
    .focus {
      font-size: 1.5em;
    }
    .dayLevel1 {
      background-color: var(--color1, #02f0c6);
    }
    .dayLevel2 {
      background-color: var(--color2, #f2790f);
    }
    .dayLevel3 {
      background-color: var(--color3, #e63946);
    }

    .status-container {
      padding: 10px;
    }
    .status {
      width: 90%;
      padding: 10px;
      margin: 10px;
      text-align: center;
      font-weight: bold;
      font-size: 1.2em;
    }

    .hours-container {
      display: flex;
      width: 90%;
      margin: auto;
      padding-bottom: 20px;
    }
    .hours-container .hour:first-child {
      border-top-left-radius: 60px;
      border-bottom-left-radius: 60px;
    }
    .hours-container .hour:not(:last-child) {
      margin-right: 1px;
    }
    .hours-container .hour:last-child {
      border-top-right-radius: 60px;
      border-bottom-right-radius: 60px;
    }
    .hour {
      position: relative;
      height: 30px;
      flex: 1 1 0%;
    }
    .hourLevel1 {
      background-color: var(--color1, #02f0c6);
    }
    .hourLevel2 {
      background-color: var(--color2, #f2790f);
    }
    .hourLevel3 {
      background-color: var(--color3, #e63946);
    }
    .hourLabel {
      position: absolute;
      bottom: -20px;
      left: -8px;
      font-size: 12px;
    }
    .hours-container .hour:nth-child(even) .hourLabel {
      /* n'affiche qu'une heure sur deux */
      display: none;
    }

    .ecowatt-error {
      background-color: red;
      color: white;
      padding: 10px;
    }
`;

export default styles;
