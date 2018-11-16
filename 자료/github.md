# github 명령어

## 원격지로 올리기 ##
> 로컬에서 원격지로 파일 올릴때 사용하는 명령어
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
## 원격지 폴더/파일 삭제 ##
> 원격지에 파일을 잘못올리거나 했을 때 지우는 법. 폴더나 파일이나 동일함.
* 순서 
```
1. git rm -rf --cached <폴더명> : 캐시? 삭제
2. git ls-files --stage <폴더명> : 남아 있는지 체크
3. git add <폴더명>
4. git commit -m <설명>
5. git push
```
---
## 로컬로 내려받기 ##
> 원격지에서 로컬로 변경된 소스를 내려 받을 때 사용하는 명령어
* 순서 
```
1. git clone <저장소 주소>
2. git pull
``` 
* git clone <저장소 주소>
```
클라이언트 상에 아무것도 없을 때 서버의 프로젝트를 내려받는 명령어
저장소의 내용을 다운로드받고 자동으로 init도 됨
```
* git pull
```
원격저장소에서 수정된 파일이 있을 때 내려받기 위해 사용하는 명령어
```

## merge
## diff
## remove


## 에러 메시지
refusing to merge unrelated histories
 git pull 에러
 	
git pull origin 브런치명 --allow-unrelated-histories


git push --force 강제로 밀어넣기