import { business } from '../config/business';

export default function AnnouncementBar() {
  return <div className="announce" role="note">{business.announcement}</div>;
}
