type Props = { text?: string }

export default function Footer({ text = 'Footer' }: Props) {
  return <footer className="footer">{text}</footer>
}
