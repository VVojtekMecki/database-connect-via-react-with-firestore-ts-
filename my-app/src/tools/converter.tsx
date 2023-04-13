import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from 'firebase/firestore';
import {User} from '../tools/users'

//unused converter function that was supposed to fetch data and prepare data for a submit
const userConverter = {
    toFirestore(data: WithFieldValue<User>): DocumentData {
      return {name: data.name,surname: data.surname,login: data.login};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options?: SnapshotOptions
    ): User {
      const data = snapshot.data(options);
      return new User(data.id, data.name, data.surname, data.login, data.isDeleted);
    }
  };

  export {userConverter};