import { Profanity, ProfanityOptions } from '@2toad/profanity';

const options = new ProfanityOptions();
options.wholeWord = false;
options.grawlix = '****';
options.grawlixChar = '$';

const profanity = new Profanity(options);

const censor = (text: string): string => {
  const convertedText = text.replace('@', 'a').replace('$', 's');
  return profanity.censor(convertedText);
};

export default censor;
