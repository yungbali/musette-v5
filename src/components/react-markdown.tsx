import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from './ui/button';
import { Download, Loader } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface MarkDownDisplayProps {
  text?: string;
  title?: string;
  btnText?: string;
  loading?: boolean;
  error?: string;
}

const MarkDownDisplay = ({ text, title = "Generated Plan", btnText = "Download", loading, error }: MarkDownDisplayProps) => {
  const [markdownText, setMarkdownText] = useState(text);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setMarkdownText(event.target.value);
  };

  const handleExportToTxt = () => {
    if (markdownText) {
      // Create a Blob with the markdown content
      const blob = new Blob([markdownText], { type: "text/plain" });

      // Create a temporary URL for the blob
      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "example.txt"; // Set the filename for the download
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up the URL and remove the link
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Button onClick={handleExportToTxt}>
          <Download className="mr-2" /> {btnText}
        </Button>
      </div>
      <div className="my-6 p-4 border rounded-lg">
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
      <textarea
        value={markdownText}
        onChange={handleChange}
        rows={7}
        className="w-full p-4 border-2 rounded-md"
      />
    </div>
  );
};

export default MarkDownDisplay;
