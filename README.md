## nestjs Rest 방식 간단한 api 구현

## validate : class-validator

- pipe option 을 설정하면 보안 강화 가능

```
  new ValidationPipe({
      whitelist: true, //그냥통과 거름
      forbidNonWhitelisted: true, //오류를 띄움
    }),
  );
```

- validate 옵션중 자동 형변환 transform 도 있음
  - 단 타입이 틀려도 오류가 뜨거나 하지는 않는다.

```
app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //그냥통과 거름
      forbidNonWhitelisted: true, //오류를 띄움
      transform: true, //아이디 같은 number 로 바껴야 되는것들 자동 형변환 해줌

    }),
  );
```

## mapped-type

- graphql, swagger 두가지 방법이 있고 이걸 통합한 것이 @nestjs/mapped-types

```
import { PickType } from '@nestjs/swagger';
export class CreateMovieDto extends PickType(MovieEntity, ['title']) {}
```

## dependency injection

- constractor 을 통한 injection 은 별도의 데코레이션이 없고 모듈에서 작동한다.
- 모듈의 provider 에 주입할 서비스를 넣어놓으면 그 모듈에서 주입 시킬 수 있다.

```

@Module({
  providers: [MoviesService],//바로 요기
  controllers: [MoviesController],
})
```

## 주의할점

- express 방식으로 사용 할수 있고 메서드나 속성에 접근할 수도 있으나
- 될수있으면 안하는게 좋다 왜냐하면 nestjs 는 2개의 프레임워크 라이브러리와 함께 작동하기 때문이다(express fastify)
- 이 두가지 요소를 아무 문제 없이 전환하려면 네스트 방식으로 작성하는것이 가장 좋다.

## 테스트코드는 노가다 성인것 같다. 하지만 테스트로 보장 된다는 점에서 좋다.
