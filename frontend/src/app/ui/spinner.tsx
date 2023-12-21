const Spinner = (props: any) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="spinner-border h-16 w-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-lg font-semibold flex animate-pulse">
          {props.message}
        </p>
      </div>
    </div>
  );
};

export default Spinner;
