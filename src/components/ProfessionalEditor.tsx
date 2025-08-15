import React, { useRef } from "react";
import ReactQuill from "react-quill-new"

interface ProfessionalEditorProps {
  editorContent: string;
  setEditorContent: (value: string) => void;
  setValue: (field: string, value: string) => void;
  errors?: {
    content?: {
      message?: string;
    };
  };
}

const ProfessionalEditor: React.FC<ProfessionalEditorProps> = ({
  editorContent,
  setEditorContent,
  setValue,
  errors,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const applyFormat = (format: string, value: any) => {
    quillRef.current?.getEditor().format(format, value);
  };

  const insertLink = () => {
    const url = prompt("Insira o link:");
    if (url) quillRef.current?.getEditor().format("link", url);
  };

  const setHeader = (level: number | false) => {
    quillRef.current?.getEditor().format("header", level);
  };

  const setAlign = (alignment: "left" | "center" | "right") => {
    quillRef.current?.getEditor().format("align", alignment);
  };

  return (
    <div className="flex flex-col gap-3 w-full max-md:w-[65%]">
      <span className="text-lg font-medium">Descrição do Blog</span>

      {/* Toolbar avançada */}
      <div className="flex flex-wrap gap-2 bg-gray-100 border border-gray-300 rounded-t-md p-2 shadow-sm">
        {/* Headers */}
        <select
          onChange={(e) => setHeader(e.target.value === "0" ? false : Number(e.target.value))}
          className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 transition"
          title="Cabeçalhos"
        >
          <option value="0">Normal</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
        </select>

        <button type="button" onClick={() => applyFormat("bold", true)} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Negrito">B</button>
        <button type="button" onClick={() => applyFormat("italic", true)} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Itálico">I</button>
        <button type="button" onClick={() => applyFormat("underline", true)} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Sublinhado">U</button>
        <button type="button" onClick={() => applyFormat("strike", true)} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Tachado">S</button>

        <button type="button" onClick={() => applyFormat("list", "ordered")} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Lista ordenada">1.</button>
        <button type="button" onClick={() => applyFormat("list", "bullet")} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Lista com marcadores">•</button>

        <button type="button" onClick={() => setAlign("left")} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Alinhar à esquerda">⬅</button>
        <button type="button" onClick={() => setAlign("center")} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Centralizar">↔</button>
        <button type="button" onClick={() => setAlign("right")} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Alinhar à direita">➡</button>

        <button type="button" onClick={insertLink} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:scale-105 transition transform duration-150" title="Inserir link">🔗</button>
      </div>

      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={(value) => {
          setEditorContent(value);
          setValue("content", value);
        }}
        className="border border-gray-300 rounded-b-md bg-white h-52 shadow-sm focus:ring-2 focus:ring-blue-400"
        modules={{ toolbar: false }}
      />

      {errors?.content && <span className="text-red-700 text-xs">{errors.content.message}</span>}
    </div>
  );
}

export default ProfessionalEditor;
