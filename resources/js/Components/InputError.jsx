export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-[#B3402E] ' + className}
        >
            {message}
        </p>
    ) : null;
}
