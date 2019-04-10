import { Pipe, PipeTransform } from '@angular/core';
import Autolinker from 'autolinker';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'parser'
})
export class ParserPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }
  transform(value: string, args?: any): any {
      return this._sanitizer.bypassSecurityTrustHtml(this.automaticLinks(value));
  }
  automaticLinks(value: string){
    const youtube = /(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
    const img = /\.(jpeg|jpg|gif|png)$/;
    return Autolinker.link(value, {
      truncate: 30,
      replaceFn: (match) => {
        const url = match.getAnchorHref();
        if (match.getType() === 'url') {
          if (url.match(img)) {
            const tag = match.buildTag();
            tag.addClass('image-container');
            tag.setInnerHtml(`<img src="${url}"/>`);
            return tag;
          } else if (url.match(youtube)) {
            const embed = `<div class="video-container"><iframe src="https://www.youtube.com/embed/${url.match(youtube)[1]}" frameborder="0" allowfullscreen></iframe></div>`;
            return embed;
          }
        }
      }
    });
  }
  // parseVideo(txt: string) {
  //   const p = /(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
  //   const video = txt.match(p);
  //   if (video) {
  //     const before = txt.split(video[0])[0];
  //     const after = txt.split(video[0])[1];
  //     console.log(txt.replace(video[0], ''));
  //     return `<div>${before}</div><div class="video-container"><iframe src="https://www.youtube.com/embed/${video[1]}" frameborder="0" allowfullscreen></iframe></div><div>${after}</div>`;
  //   }
  //   return false;
  // }
  // parseImage(txt: string){
  //   const p = /\.(jpeg|jpg|gif|png)$/;
  // }
}
