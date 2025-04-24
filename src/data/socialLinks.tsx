import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "@/styles/socialLinks.module.scss";
import { ReactElement } from "react";

export interface SocialLinkType {
  id: number;
  name: string;
  icon: ReactElement; // <- this is the correct type for rendered elements
  url: string;
}
/**
 * @description social links data
 */
export default [
  {
    id: 1,
    name: "Github",
    icon: <FaGithub className={styles.icon} />,
    url: "https://github.com/CNFishead",
  },
  {
    id: 2,
    name: "LinkedIn",
    icon: <FaLinkedin className={styles.icon} />,
    url: "https://www.linkedin.com/in/cnfishead1993/",
  },
] as SocialLinkType[];
