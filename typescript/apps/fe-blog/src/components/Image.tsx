import { VoidComponent, type JSX } from "solid-js";
import PreloadedImage from "~/components/PreloadedImage";
import Skeleton from "~/components/Skeleton";

type Props = {
  class?: string;
} & JSX.ImgHTMLAttributes<HTMLImageElement>;

const Image: VoidComponent<Props> = (props) => {
  return <PreloadedImage {...props} renderFallback={Skeleton} />;
};

export default Image;
