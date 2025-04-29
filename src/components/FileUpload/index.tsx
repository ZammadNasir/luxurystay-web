import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

interface FileUploadProps {
  activity?: boolean;
  multiple?: boolean;
  hideMessage?: boolean;
  element?: React.ReactElement;
  message?: string;
  stateName?: string;
  className?: string;
  disabled?: boolean;
  sectionClassName?: string;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  labelText?: string;
  classesNames?: string;
  showUploadBtn?: boolean;
  imgLabel?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadFile: (
    file: FileList | null,
    name: string | undefined,
    state_name: string | undefined
  ) => void;
  name?: string;
  children?: React.ReactNode;
  classes?: Record<string, any>;
  acceptedFileTypes: any;
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const {
    uploadFile,
    name,
    stateName,
    disabled = false,
    classes,
    imgLabel,
    showUploadBtn = true,
    children,
    acceptedFileTypes,
  } = props;
  const sendImage = (file: any) => {
    uploadFile(file, name, stateName);
  };

  return (
    <Dropzone
      accept={acceptedFileTypes}
      disabled={disabled}
      multiple={props.multiple}
      onDrop={async (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          if (file.type.startsWith("image/")) {
            const image = new Image();
            image.addEventListener("load", () => {
              if (
                image.width / image.height >= 1 &&
                image.width / image.height <= 2.2
              ) {
                sendImage(file);
              } else {
                toast.error("Image size to big.");
              }
            });
            image.src = URL.createObjectURL(file);
          } else {
            // Handle non-image files (PDF, Word)
            sendImage(file);
          }
        });
      }}
    >
      {({ getRootProps, getInputProps }: any) => (
        <section
          style={{
            pointerEvents: showUploadBtn ? "auto" : "none",
          }}
        >
          <div {...getRootProps()} className={props.className}>
            <input {...getInputProps()} />
            {props.element}
            <div>
              <div>
                <div onClick={(e) => e.stopPropagation()}>
                  <span>{imgLabel}</span>
                </div>
                {children}
              </div>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUpload;
