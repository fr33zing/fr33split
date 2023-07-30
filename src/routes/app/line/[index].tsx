import { useParams } from "solid-start";

import styles from "./[index].module.scss";

export default function LinePage() {
  const params = useParams();
  return <div class={styles.container}>Line {params.index}</div>;
}
