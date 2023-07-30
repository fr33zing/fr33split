import type { Component } from "solid-js";
import { createSignal } from "solid-js";

/* import receipt from "~/public/receipt.jpg"; */
import styles from "./App.module.scss";
import "./App.css";

import { setLinesFromReceiptImage } from "~/state/lines";
import { Outlet, useMatch } from "@solidjs/router";
import { getImageDimensions, ImageDimensions } from "~/lib/image";
import { Transition } from "solid-transition-group";

const receipt = "/receipt.jpg";

const App: Component = () => {
  const [imageDimensions, setImageDimensions] = createSignal<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const receiptVisible = useMatch(() => "/app/line/*");

  (async () => {
    setImageDimensions(await getImageDimensions(receipt));
  })();

  setLinesFromReceiptImage(receipt);

  return (
    <div class={styles.app}>
      <img class={styles.receipt} src={receipt} />

      <div
        class={`${styles.controls} ${
          receiptVisible() ? styles.receiptVisible : ""
        }`}
      >
        <Transition name="slide-fade">
          <Outlet />
        </Transition>
      </div>
    </div>
  );
};

export default App;
