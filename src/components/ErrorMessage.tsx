interface Props {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="error-box" role="alert">
      <strong>불러오지 못했습니다.</strong>
      <p>{message}</p>
    </div>
  )
}
