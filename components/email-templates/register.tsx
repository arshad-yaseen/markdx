import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface EmailRegisterTemplateProps {
  magicLink: string
  productName: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const EmailRegisterTemplate = ({
  magicLink,
  productName,
}: EmailRegisterTemplateProps) => (
  <Html>
    <Head />
    <Preview>Register with this magic link.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/markdx-white.png`}
          width={48}
          height={48}
          alt="MarkDX"
        />
        <Heading style={heading}>
          Welcome to
          {productName}
        </Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Button pY={11} pX={23} style={button} href={magicLink}>
              Click here
            </Button>
          </Text>
          <Text style={paragraph}>
            If you didn&apos;t request this, please ignore this email.
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          {productName}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailRegisterTemplate

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "48px 24px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
}

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
}

const body = {
  margin: "24px 0",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}
const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
}
