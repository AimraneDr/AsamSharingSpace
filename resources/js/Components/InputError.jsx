export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <span {...props} className={'text-sm text-red-600' + className}>
            {message}
        </span>
    ) : null;
}
