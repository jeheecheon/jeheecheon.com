/* eslint-disable @typescript-eslint/no-explicit-any */

import { Nullable } from "@packages/common/types/misc";
import Icon from "@packages/ui/components/Icon";
import { cn } from "@packages/ui/utils/class-name";
import katex from "katex";
import type Quill from "quill";
import { arrowUturnLeft, arrowUturnRight, star } from "solid-heroicons/outline";
import { createEffect, createUniqueId, VoidComponent } from "solid-js";
import { clientOnly } from "solid-use/client-only";
import { insertImage, insertStar, redoChange, undoChange } from "~/utils/quill";

import "katex/dist/katex.min.css";
import "quill/dist/quill.snow.css";

const SolidQuill = clientOnly(() =>
  import("solid-quill").then((module) => ({
    default: module.SolidQuill,
  })),
);

const ContentEditor: VoidComponent<{
  class?: string;
  htmlContent: string;
  onChange: (html: string) => void;
}> = (props) => {
  const toolbarId = createUniqueId();

  return (
    <div class={cn("bg-white text-black", props.class)}>
      <CustomQuillTollbar class="sticky top-0 z-10 bg-white" id={toolbarId} />
      <CustomQuill
        toolbarId={toolbarId}
        htmlContent={props.htmlContent}
        onChange={props.onChange}
      />
    </div>
  );
};

const CustomQuillTollbar: VoidComponent<{
  class?: string;
  id?: string;
}> = (props) => {
  return (
    <div class={cn(props.class)} id={props.id}>
      <div class="ql-formats">
        <select class="ql-header" value="">
          {/* <option value="1">Header 1</option> */}
          <option value="2">Header 2</option>
          <option value="3">Header 3</option>
          <option value="4">Header 4</option>
          <option value="5">Header 5</option>
          <option value="6">Header 6</option>
          <option value="">Header</option>
        </select>
      </div>

      <div class="ql-formats">
        <select class="ql-size" value="">
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="">Size</option>
        </select>
      </div>

      <div class="ql-formats">
        <select class="ql-font" value="">
          <option value="arial">Arial</option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
          {/* <option value="Noto_Sans_KR">Noto KR</option> */}
          <option value="">Font</option>
        </select>
      </div>

      <div class="ql-formats">
        <button class="ql-align" value="" />
        <button class="ql-align" value="center" />
        <button class="ql-align" value="right" />
        <button class="ql-align" value="justify" />
      </div>

      <span class="ql-formats">
        <button class="ql-bold" />
        <button class="ql-italic" />
        <button class="ql-underline" />
        <button class="ql-strike" />
      </span>

      <span class="ql-formats">
        <button class="ql-list" value="ordered" />
        <button class="ql-list" value="bullet" />
        <button class="ql-indent" value="-1" />
        <button class="ql-indent" value="+1" />
      </span>

      <span class="ql-formats">
        <button class="ql-code" />
        <button class="ql-code-block" />
        <button class="ql-formula" />
        <button class="ql-clean" />
      </span>

      <span class="ql-formats">
        <button class="ql-blockquote" />
        <button class="ql-script" value="sub" />
        <button class="ql-script" value="super" />
      </span>

      <span class="ql-formats">
        <select class="ql-color" value="" />
        <select class="ql-background" value="" />
      </span>

      <span class="ql-formats">
        <button class="ql-link" />
        <button class="ql-image" />
        <button class="ql-video" />
      </span>

      <span class="ql-formats">
        <button class="ql-undo">
          <Icon path={arrowUturnLeft} />
        </button>
        <button class="ql-redo">
          <Icon path={arrowUturnRight} />
        </button>
      </span>

      <span class="ql-formats">
        <button class="ql-star">
          <Icon path={star} />
        </button>
      </span>
    </div>
  );
};

const CustomQuill: VoidComponent<{
  class?: string;
  toolbarId?: string;
  htmlContent: string;
  onChange: (html: string) => void;
}> = (props) => {
  let quill: Nullable<Quill> = null;

  createEffect(() => {
    setHtmlContent(props.htmlContent);
  });

  return (
    <SolidQuill
      ref={(element) => (quill = element)}
      theme="snow"
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "align",
        "strike",
        "script",
        "blockquote",
        "background",
        "list",
        "bullet",
        "indent",
        "link",
        "video",
        "image",
        "color",
        "code",
        "code-block",
        "formula",
      ]}
      modules={{
        toolbar: {
          container: `#${props.toolbarId}`,
          handlers: {
            undo: undoChange,
            redo: redoChange,
            star: insertStar,
            image: insertImage,
          },
        },
        clipboard: {
          matchVisual: true,
        },
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      }}
      onReady={handleInit}
      onTextChange={handleChange}
    />
  );

  async function handleInit() {
    Object.assign(window, { katex });

    const Quill = (await import("quill")).default;

    const Size = Quill.import("formats/size") as any;
    Size.whitelist = [
      "10",
      "12",
      "14",
      "16",
      "18",
      "20",
      "22",
      "24",
      "26",
      "28",
      "30",
    ];

    const Font = Quill.import("formats/font") as any;
    Font.whitelist = [
      "arial",
      "comic-sans",
      "courier-new",
      "georgia",
      "helvetica",
      "lucida",
      "Noto_Sans_KR",
    ];

    Quill.register(Size, true);
    Quill.register(Font, true);

    setHtmlContent(props.htmlContent);
  }

  function handleChange() {
    props.onChange(quill?.getSemanticHTML() ?? "");
  }

  function setHtmlContent(htmlContent: string) {
    if (!quill || typeof htmlContent !== "string") {
      return;
    }

    quill.clipboard.dangerouslyPasteHTML(htmlContent);
  }
};

export default ContentEditor;
