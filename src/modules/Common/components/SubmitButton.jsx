import { Button } from "reactstrap";

export default function SubmitButton({ isProcessing, children, ...props }) {
  return (
    <Button type="submit" color="primary" disabled={isProcessing} {...props}>
      {isProcessing && <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>}
      {children}
    </Button>
  );
}
