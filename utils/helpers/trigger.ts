const TRIGGERS = ["zak", "zakbot", "ghosts", "ghosts", "paranormal"];

const isTriggered = (text: string) =>
  text.split(" ").some((word) => TRIGGERS.includes(word.toLowerCase()));

export default isTriggered;
