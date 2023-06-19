

export default function ClientItem({ clientObj }) {
    let { id, firstName, lastName } = clientObj
    return (
        <>
            <li key={id}>
                {firstName} {lastName}
            </li>
        </>
    )
}