import type { SerializedUserAuthData } from '~/core/session/types/user-session';
import { Avatar, AvatarFallback, AvatarImage } from '~/core/ui/Avatar';

type ProfileAvatarProps =
  | {
      user: Maybe<SerializedUserAuthData>;
    }
  | {
      text: Maybe<string>;
    };

const ProfileAvatar: React.FCC<ProfileAvatarProps> = (props) => {
  if ('user' in props && props.user) {
    return (
      <Avatar>
        {props.user.photoURL ? <AvatarImage src={props.user.photoURL} /> : null}

        <AvatarFallback>{getUserInitials(props.user)}</AvatarFallback>
      </Avatar>
    );
  }

  if ('text' in props && props.text) {
    return (
      <Avatar>
        <AvatarFallback>{props.text[0]}</AvatarFallback>
      </Avatar>
    );
  }

  return null;
};

function getUserInitials(user: SerializedUserAuthData) {
  const displayName = getDisplayName(user);

  return displayName[0] ?? '';
}

function getDisplayName(user: SerializedUserAuthData) {
  if (user.displayName) {
    return user.displayName;
  }

  return user.email ?? '';
}

export default ProfileAvatar;
