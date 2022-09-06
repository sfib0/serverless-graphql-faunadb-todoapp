import { MouseEventHandler } from "react";

import * as styles from '../css/style.module.css'

interface EmoteButtonProps {
  emote: string;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const EmoteButton: React.FC<EmoteButtonProps> = ({ emote, onClick }) => {
  return <button className={styles.emoteButton} onClick={onClick}>{emote}</button>
}

export default EmoteButton;