import { MdClose } from "react-icons/md";
import "./Input.css";
import { LuCheck } from "react-icons/lu";

const Input = ({
	register,
	updateProfileHandler,
	field,
	setEditable,
	handleBlur,
}) => {
	return (
		<div className="input-container">
			<input
				className="input"
				type="text"
				{...register(field)}
				placeholder={field}
				onBlur={() => handleBlur(field)}
			/>
			<span className="icon">
				<MdClose
					size={20}
					className="cancel"
					onClick={() => setEditable(null)}
				/>
				<LuCheck size={20} className="save" onClick={() => handleBlur(field)} />
			</span>
		</div>
	);
};

export default Input;
