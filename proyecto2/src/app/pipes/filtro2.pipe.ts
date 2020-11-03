import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro2'
})
export class FilterPipe2 implements PipeTransform {

  transform(value: any, ...arg: any[]): any {

const resultPosts =[];
for(const post of value){
if(post.palabras.indexOf(arg)> -1){
resultPosts.push(post);

};

};
return resultPosts;
  }

}