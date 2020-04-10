import { pipe } from '~helpers/utils';

import { stringInclude } from './rules';

export const strictNodeEnvValueValidator = (nodeEnvs: string[]) =>
  // We can add more validator functions here if needed () => ...funcs
  pipe(() => stringInclude(nodeEnvs));

// export const checkCreation = <T extends CoreEntity>(entity: () => T) => {
//   const entityRepository = InjectRepository();
//   Reposito;
//   // We can add more validator functions here if needed () => ...funcs
//   pipe(() => stringInclude(nodeEnvs));
// };
