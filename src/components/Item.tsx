import type { Component } from "solid-js";
import { A } from "solid-start";
import { BsQuestionLg, BsQuestion } from "solid-icons/bs";

import { BillLine } from "~/lib/items";
import styles from "./Item.module.scss";

interface ItemProps {
  line: BillLine;
  index: number;
}

const Item: Component<ItemProps> = (props) => {
  return (
    <A class={styles.item} href={`/app/line/${props.index}`}>
      <BsQuestionLg class={styles.status} />
      <span class={styles.text}>{props.line.text}</span>
      <div class={styles.quantity}>
        <BsQuestion class={styles.unassigned} />
        <span class={styles.quantityNumber}> &times;{props.line.quantity}</span>
      </div>
      <span class={styles.value}>${props.line.value?.toFixed(2)}</span>
    </A>
  );
};

export default Item;
