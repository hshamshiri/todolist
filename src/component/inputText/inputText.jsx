const InputText = ({ saveTask, inputText, inputHasChange }) => {
  return (
    <div className="w-screen mb-3 mt-3 px-5">
      <input
        onKeyDown={(e) => saveTask(e.keyCode)}
        className="w-full p-1 shadow shadow-blue-500 border "
        value={inputText}
        onChange={(e) => inputHasChange(e.target.value)}
        placeholder={"Add New"}
      />
    </div>
  );
};
export default InputText;
