export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-sand-300 text-espresso-700 shadow-sm focus:ring-bronze-500/40 focus:border-bronze-500 ' +
                className
            }
        />
    );
}
