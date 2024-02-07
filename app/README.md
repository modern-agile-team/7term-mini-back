# **7term-mini-back**

#### 7기 미니프로젝트 백 저장소

---

## Branch Strategy


**이슈 생성 시 `Assignees`, `Labels`, `Project` 를 꼭 설정해주세요**

### Default Branch

| Name | Description                    |
| ---- | ------------------------------ |
| main | repository default branch      |
| dev  | development environment branch |

### Branch Example

Issue 생성 시 action bot 이 아래처럼 comment 를 남깁니다.

![image](https://github.com/modern-agile-team/dongurami-server-v2/assets/46591459/654a7268-d4b8-477b-b32a-d252d9ae03bf)

- {Label}/#{issue-number}/{issue-title}
  - Issue 생성 시 title 의 25 까지 브랜치로 생성되니 영문으로 짧게 작성 후 본문에 내용 채워주세요.
  - Branch name 으로 적절하지 않은 문자(공백 등)는 `_`로 처리됩니다.
  - example
    - setting/#3/project_set_up

</br>

## Commit Convention

---

### Commit Example

**{type}/#{issue-number}: 작업한 사항(띄어쓰기 허용)**

예시

- setting/#3: project set up

### Commit Type

| Type     | Description                          |
| -------- | ------------------------------------ |
| bugfix   | 버그 수정                            |
| db       | 데이터베이스 관련 작업               |
| delete   | 코드 삭제                            |
| doc      | 문서 작업                            |
| feat     | 새로운 기능 추가                     |
| modify   | 코드 수정(기능상의 수정이 있는 경우) |
| refactor | 코드 수정(기능상의 수정이 없는 경우) |
| test     | 테스트코드 관련 작업                 |
| deploy   | 배포 관련 작업                       |
| setting  | 세팅 관련 작업                       |



