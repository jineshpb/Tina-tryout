import PasswordProtection from "@/components/PasswordProtection"

const FIGMA_LINK =
  "https://www.figma.com/deck/96fi7OYhv2wFiTDoqOmvZe/Selected-works?node-id=1-448&t=SP1VA9xi4A998L2L-1"
const EXPECTED_PASSWORD = process.env.FIGMA_PASSWORD || "123456" // fallback for development

export default function FigmaSlidesPage() {
  return (
    <PasswordProtection
      password={EXPECTED_PASSWORD}
      link={FIGMA_LINK}
      isExternal={true}
      title="Figma Slides Access"
      description="These Figma slides contain confidential project information. Please enter the password to access. Need password? Please contact"
      email="jineshpb@gmail.com"
      successMessage="Figma Slides Access Granted!"
    />
  )
}
