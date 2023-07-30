import { For, Show } from "solid-js";

import { lines } from "~/state/lines";
import { BillLineKind } from "~/lib/items";
import Item from "~/components/Item";
import styles from "./(list).module.scss";

export default function List() {
  return (
    <div class={styles.container}>
      <For each={lines}>
        {(line, i) => (
          <Show when={line.kind != BillLineKind.Junk}>
            <Item line={line} index={i()} />
          </Show>
        )}
      </For>
    </div>
  );
}
