# github 명령어

## 원격지로 올리기 ##
* 순서 
```
1. git init
2. git remote add <name> <url>
3. git add . 
   (1) 폴더 채로 add -> git add 폴더명/
4. git commit -m <comment>
5. git push (git push --set-upstream origin master)
``` 
* git init
```
새로운 local repository 생성
```
* git add
```
변경된 파일을 storage에 추가
```
* git commit
```
add한 파일을 local repository에 저장
```
* git push
```
local repository를 remote repository에 업로드
```
---
## 원격지 파일 삭제
* git rm -rf --cached <폴더명> : 캐시? 삭제
* git ls-files --stage <폴더명> : 남아 있는지 체크
* git add <폴더명>
* git commit -m <설명>
* git push

## 로컬로 받기
1. git push
```

```







## merge
## diff

## remove
