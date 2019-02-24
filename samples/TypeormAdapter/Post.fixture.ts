import { TypeormBlueprint, TypeormProfile } from '../../src';
import { Comment } from './Comment.entity';
import { Post } from './Post.entity';
import { User } from './User.entity';

export class PostFixture extends TypeormProfile<Post> {
    public register(blueprint: TypeormBlueprint<Post>): void {
        blueprint.setType(Post);

        blueprint.define(async faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));

        blueprint.state('with-author', async faker => ({
            author: async factory => factory.for(User).create(),
        }));

        blueprint.state('with-comments', async faker => ({
            comments: async factory =>
                factory
                    .for(Comment)
                    .state('with-user')
                    .create(3),
        }));
    }
}
