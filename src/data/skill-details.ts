export type StepDetail = {
  step: string
  description: string
  actions: string[]
}

export type OutputSpec = {
  file?: string
  format: string
  requiredSections: string[]
  example?: string
}

export type SkillDetail = {
  id: string
  title: string
  subtitle: string
  purpose: string
  steps: StepDetail[]
  output: OutputSpec
  example?: string
  tips?: string[]
  redFlags?: string[]
}

export const skillDetails: Record<string, SkillDetail> = {
  brainstorming: {
    id: 'brainstorming',
    title: 'Brainstorming',
    subtitle: 'superpowers:brainstorming',
    purpose: 'HARD-GATE bắt buộc trước mọi creative work. AI sẽ trao đổi requirements, propose giải pháp, tạo design spec. Tuyệt đối không code cho đến khi design được approve.',
    steps: [
      {
        step: 'Tìm hiểu ngữ cảnh dự án',
        description: 'AI đọc CLAUDE.md, quét cấu trúc code để hiểu tech stack, conventions và patterns hiện có.',
        actions: [
          'Đọc CLAUDE.md để nắm được conventions, commands, tech stack',
          'Quét cấu trúc thư mục để hiểu kiến trúc tổng thể',
          'Tìm các tính năng tương tự đã có để tái sử dụng patterns',
        ],
      },
      {
        step: 'Đề xuất visual companion (tuỳ chọn)',
        description: 'Nếu cần quyết định về giao diện (mockup, so sánh layout), AI sẽ đề xuất mở trình duyệt để hiển thị trực quan.',
        actions: [
          'Chỉ đề xuất khi có câu hỏi liên quan đến UI/visual',
          'Phải là tin nhắn riêng — không gộp chung với câu hỏi khác',
          'Nội dung text/khái niệm vẫn trao đổi qua terminal',
        ],
      },
      {
        step: 'Hỏi làm rõ yêu cầu',
        description: 'AI hỏi từng câu một để hiểu rõ phạm vi, ràng buộc, và edge cases. Ưu tiên câu hỏi dạng trắc nghiệm.',
        actions: [
          'Mỗi lần chỉ hỏi MỘT câu — không gộp nhiều câu',
          'Ưu tiên dạng lựa chọn A/B/C thay vì câu hỏi mở',
          'Cần làm rõ: phạm vi, đối tượng sử dụng, luồng dữ liệu, edge cases',
        ],
      },
      {
        step: 'Đề xuất 2-3 hướng tiếp cận',
        description: 'AI trình bày các phương án với ưu/nhược điểm và đề xuất phương án tốt nhất.',
        actions: [
          'Tối thiểu 2, tối đa 3 phương án',
          'Mỗi phương án có phân tích ưu/nhược điểm',
          'Đề xuất rõ ràng phương án nào nên chọn và lý do',
          'Áp dụng YAGNI — loại bỏ tính năng không cần thiết',
        ],
      },
      {
        step: 'Trình bày thiết kế chi tiết',
        description: 'Trình bày thiết kế theo từng phần. Chờ bạn xác nhận trước khi tiếp tục.',
        actions: [
          'Mô tả vấn đề cần giải quyết + Mục tiêu',
          'Tech stack + Quyết định kiến trúc',
          'Thiết kế component/API chi tiết',
          'Luồng dữ liệu + Quản lý state',
          'Xử lý edge cases + Error handling',
          'Phạm vi ngoài (những gì KHÔNG làm)',
        ],
      },
      {
        step: 'Tạo tài liệu thiết kế (Spec)',
        description: 'Lưu thiết kế đã duyệt thành file markdown trong docs/superpowers/specs/.',
        actions: [
          'Đường dẫn: docs/superpowers/specs/YYYY-MM-DD-<tên-tính-năng>-design.md',
          'Ghi lại TẤT CẢ quyết định đã thống nhất trong quá trình brainstorming',
          'Không được có TBD hoặc TODO — mọi thứ phải rõ ràng',
          'Commit file spec vào git',
        ],
      },
      {
        step: 'Tự review tài liệu',
        description: 'AI tự kiểm tra lại tài liệu để đảm bảo chất lượng trước khi gửi bạn xem.',
        actions: [
          'Kiểm tra placeholder: không còn TBD/TODO/TBC',
          'Kiểm tra tính nhất quán: không mâu thuẫn giữa các phần',
          'Kiểm tra phạm vi: đúng với những gì đã thống nhất',
          'Kiểm tra độ rõ ràng: mọi quyết định đều có thể thực thi',
        ],
      },
      {
        step: 'Bạn duyệt tài liệu',
        description: 'AI gửi tài liệu cho bạn xem lần cuối để xác nhận hoặc chỉnh sửa.',
        actions: [
          'Chia sẻ đường dẫn file spec',
          'Đánh dấu những phần chưa chắc chắn',
          'Chờ bạn xác nhận rõ ràng',
        ],
      },
      {
        step: 'Chuyển sang viết kế hoạch triển khai',
        description: 'Sau khi spec được duyệt, AI tự động chuyển sang bước writing-plans. Đây là bước duy nhất tiếp theo hợp lệ.',
        actions: [
          'Gọi skill writing-plans với spec làm đầu vào',
          'KHÔNG BAO GIỜ nhảy thẳng vào viết code',
        ],
      },
    ],
    output: {
      file: 'docs/superpowers/specs/YYYY-MM-DD-<tên>-design.md',
      format: 'Tài liệu Markdown có cấu trúc, ghi lại toàn bộ quyết định thiết kế',
      requiredSections: ['Mô tả vấn đề', 'Tech Stack', 'Kiến trúc', 'Thiết kế API/Component', 'Edge Cases', 'Phạm vi ngoài'],
      example: `# Chunk Load Tickets — Tài liệu Thiết kế
**Ngày:** 2026-04-12 | **Trạng thái:** Đã duyệt

## Vấn đề
API hiện tại load toàn bộ 100-2000 tickets cùng lúc, gây chậm.

## Tech Stack
NestJS 11, Prisma (MongoDB), class-validator

## Kiến trúc
Phân trang cursor-based, tương thích ngược.
Không có tham số \`limit\`: giữ nguyên behavior cũ.
Có \`limit\`: trả về { data, nextCursor, hasMore }.

## API Contract
GET /tickets?limit=20&cursor=abc123
Response: { data: Ticket[], nextCursor: string | null, hasMore: boolean }

## Edge Cases
- Collection rỗng → { data: [], nextCursor: null, hasMore: false }
- Cursor không hợp lệ → 400 Bad Request

## Phạm vi ngoài
- Phân trang offset-based
- Tham số sắp xếp`,
    },
    tips: [
      'Tuyệt đối không viết code trước khi thiết kế được duyệt',
      'Hỏi từng câu một — không gộp nhiều câu hỏi',
      'Áp dụng YAGNI — loại bỏ tính năng "có thể cần sau này"',
      'Luôn đề xuất nhiều phương án dù ý tưởng đầu có vẻ hiển nhiên',
      'Xác nhận từng phần thay vì gửi cả tài liệu dài một lần',
    ],
    redFlags: [
      'Bắt đầu viết code trước khi thiết kế được duyệt',
      'Gộp nhiều câu hỏi trong một tin nhắn',
      'Bỏ qua phân tích ưu/nhược điểm',
      'Để lại TBD/TODO trong tài liệu spec',
      'Nhảy thẳng vào code mà không qua bước writing-plans',
    ],
  },

  'writing-plans': {
    id: 'writing-plans',
    title: 'Viết Kế Hoạch Triển Khai',
    subtitle: 'superpowers:writing-plans',
    purpose: 'Chia nhỏ thành các TDD task bite-sized (2-5 phút/step). Plan phải đủ chi tiết để bất kỳ ai cũng execute được mà không cần hỏi thêm. Không placeholder, không ambiguity.',
    steps: [
      {
        step: 'Kiểm tra phạm vi',
        description: 'Nếu spec bao gồm nhiều hệ thống con độc lập, đề xuất tách thành các plan riêng.',
        actions: [
          'Xác định các tính năng có thể triển khai độc lập',
          'Mỗi plan nên là một đơn vị công việc hoàn chỉnh',
          'Đề xuất tách nếu các phần không phụ thuộc nhau',
        ],
      },
      {
        step: 'Lập danh sách file cần tạo/sửa',
        description: 'Liệt kê TẤT CẢ file sẽ tạo mới hoặc chỉnh sửa TRƯỚC KHI định nghĩa tasks.',
        actions: [
          'Liệt kê từng file mới với đường dẫn và mục đích',
          'Liệt kê từng file cần sửa với nội dung thay đổi',
          'Mỗi file chỉ có MỘT trách nhiệm rõ ràng',
          'Các file hay thay đổi cùng nhau nên đặt gần nhau',
        ],
      },
      {
        step: 'Viết các task nhỏ theo TDD',
        description: 'Mỗi task mất 2-5 phút. Mỗi bước theo quy trình: viết test → chạy → code → chạy → commit.',
        actions: [
          'Dùng cú pháp checkbox: - [ ] cho mỗi bước con',
          'Mỗi bước phải là: viết test lỗi → chạy (RED) → code tối thiểu → chạy (GREEN) → commit',
          'Sắp xếp task theo thứ tự phụ thuộc (nền tảng trước)',
          'Ghi rõ đường dẫn file, tên function, type cụ thể',
        ],
      },
      {
        step: 'Viết phần header của plan',
        description: 'Mỗi tài liệu plan bắt đầu với khối header bắt buộc.',
        actions: [
          'Goal: một câu mô tả plan này đạt được gì',
          'Architecture: 2-3 câu về hướng tiếp cận',
          'Tech Stack: các công nghệ chính sử dụng',
          'Đánh dấu REQUIRED SUB-SKILL để thực thi',
        ],
      },
      {
        step: 'Loại bỏ mọi placeholder',
        description: 'Rà soát plan để tìm và loại bỏ mọi nội dung mơ hồ. Mọi chi tiết phải cụ thể.',
        actions: [
          'KHÔNG có TBD, TODO, TBC, "tương tự Task N"',
          'KHÔNG có mô tả mơ hồ kiểu "xử lý edge cases"',
          'KHÔNG có tham chiếu đến type/function chưa định nghĩa',
          'Mỗi task phải thực thi được mà không cần hỏi thêm',
        ],
      },
      {
        step: 'Tự review plan',
        description: 'Đối chiếu plan với spec. Kiểm tra đầy đủ, nhất quán, có thể build được.',
        actions: [
          'Độ bao phủ spec: mỗi yêu cầu đều có task tương ứng',
          'Kiểm tra placeholder: không còn TBD/TODO',
          'Nhất quán type: các type tham chiếu đúng với định nghĩa',
          'Thứ tự task: dependencies đúng logic',
        ],
      },
      {
        step: 'Lưu plan và chọn cách thực thi',
        description: 'Lưu plan và để bạn chọn giữa Subagent-Driven (khuyến nghị) hoặc thực thi tuần tự.',
        actions: [
          'Lưu vào docs/superpowers/plans/YYYY-MM-DD-<tên>.md',
          'Commit file plan vào git',
          'Đề xuất: SDD (khuyến nghị) hoặc executing-plans (tuần tự)',
        ],
      },
    ],
    output: {
      file: 'docs/superpowers/plans/YYYY-MM-DD-<tên>.md',
      format: 'Markdown với header block + các task đánh số có checkbox sub-steps theo TDD',
      requiredSections: ['Goal', 'Architecture', 'Tech Stack', 'Danh sách file', 'Tasks (TDD)'],
      example: `# Social Feed — Kế Hoạch Triển Khai

> **Dành cho agentic workers:** BẮT BUỘC sử dụng
> superpowers:subagent-driven-development để triển khai.

**Goal:** Xây dựng social feed với bài viết, bình luận, like
**Architecture:** NestJS module, Prisma MongoDB, Socket.io events
**Tech Stack:** NestJS 11, Prisma, class-validator

---

## Task 1: Prisma Schema Models

- [ ] Thêm PostVisibility enum (PUBLIC, CONNECTIONS_ONLY, PRIVATE)
- [ ] Tạo model CommunityPost với các trường
- [ ] Tạo PostComment, PostLike, PostShare models
- [ ] Chạy \`npx prisma db push\`
- [ ] Xác nhận: \`npx prisma studio\` hiển thị models mới
- [ ] Commit: "feat(community): add prisma schema models"

## Task 2: DTOs với Validation

- [ ] Viết test: CreateCommunityPostDto validate các trường bắt buộc
- [ ] Implement DTO với class-validator decorators
- [ ] Chạy test → GREEN
- [ ] Commit: "feat(community): add DTOs with validation"`,
    },
    tips: [
      'Mỗi task nên mất 2-5 phút — nếu lâu hơn thì tách nhỏ',
      'Lập danh sách file TRƯỚC KHI định nghĩa tasks',
      'Ghi rõ function signatures, không chỉ "implement X"',
      'DRY + YAGNI — code tối thiểu đáp ứng đúng spec',
      'Commit thường xuyên — mỗi task hoàn thành là một commit',
    ],
    redFlags: [
      'Task có placeholder TBD/TODO/TBC',
      'Mô tả mơ hồ: "xử lý edge cases", "implement tương tự"',
      'Task mất hơn 5 phút để hoàn thành',
      'Thiếu bước test trong task (mỗi task cần TDD)',
      'Không lập danh sách file trước khi viết tasks',
      'Tham chiếu đến type/function chưa định nghĩa',
    ],
  },

  'test-driven-development': {
    id: 'test-driven-development',
    title: 'Test-Driven Development',
    subtitle: 'superpowers:test-driven-development',
    purpose: 'Iron Law: KHÔNG VIẾT CODE PRODUCTION KHI CHƯA CÓ FAILING TEST. Lỡ viết code trước test? Delete code, viết test trước, start over. Không exception.',
    steps: [
      {
        step: 'RED — Viết MỘT test lỗi tối thiểu',
        description: 'Viết đúng một test kiểm tra một hành vi. Tên rõ ràng, code thực, assertion tối thiểu.',
        actions: [
          'Chỉ test MỘT hành vi duy nhất — không gộp nhiều kịch bản',
          'Đặt tên mô tả rõ: "should extract hashtags from content"',
          'Dùng code thực, type thực — không pseudo-code',
          'Assertion tối thiểu — thứ nhỏ nhất có thể thất bại',
        ],
      },
      {
        step: 'Xác nhận RED (BẮT BUỘC)',
        description: 'Chạy test. Test PHẢI lỗi. Xác nhận nó lỗi vì ĐÚNG lý do.',
        actions: [
          'Chạy lệnh test',
          'Xác nhận test LỖI (không phải pass, không phải error)',
          'Kiểm tra lý do lỗi đúng (VD: "function not found" chứ không phải "syntax error")',
          'Nếu lỗi sai lý do → sửa test trước',
        ],
      },
      {
        step: 'GREEN — Viết code TỐI THIỂU để pass',
        description: 'Viết lượng code ít nhất để test pass. Không thêm gì ngoài yêu cầu.',
        actions: [
          'Cách triển khai ĐƠN GIẢN NHẤT có thể',
          'Không thêm tính năng extra, không "tiện thể" cải thiện',
          'Chưa refactor — chỉ cần pass test',
          'Hard-code nếu đó là cách đơn giản nhất (refactor sau)',
        ],
      },
      {
        step: 'Xác nhận GREEN (BẮT BUỘC)',
        description: 'Chạy test đó — phải PASS. Chạy TẤT CẢ tests — tất cả phải PASS. Output phải sạch.',
        actions: [
          'Chạy test vừa viết → xác nhận PASS',
          'Chạy TẤT CẢ tests → xác nhận tất cả PASS',
          'Kiểm tra output SẠCH (không warning, không deprecation)',
          'Nếu test nào lỗi → sửa trước khi tiếp tục',
        ],
      },
      {
        step: 'REFACTOR — Cải thiện nhưng giữ GREEN',
        description: 'Cải thiện chất lượng code mà không thay đổi hành vi. Tests phải luôn green.',
        actions: [
          'Loại bỏ trùng lặp nếu cần thiết',
          'Extract function CHỈ KHI thực sự cần (kiểm tra YAGNI)',
          'Đổi tên cho rõ ràng hơn',
          'Chạy tests sau MỖI thay đổi refactor',
        ],
      },
      {
        step: 'COMMIT — Rồi lặp lại',
        description: 'Commit code đã pass với message có ý nghĩa. Bắt đầu chu kỳ test tiếp theo.',
        actions: [
          'Commit với message mô tả rõ ràng',
          'Bắt đầu chu kỳ Red-Green-Refactor tiếp theo',
          'Lặp lại đến khi tính năng hoàn thành',
        ],
      },
    ],
    output: {
      format: 'Tests + Code production được commit theo từng bước nhỏ',
      requiredSections: ['Test lỗi', 'Code tối thiểu', 'Tất cả tests pass', 'Commit sạch'],
    },
    example: `// ---- RED: Viết test lỗi trước ----
it('should auto-uppercase IATA codes', async () => {
  render(<SearchForm onSearch={vi.fn()} />);
  await userEvent.type(screen.getByLabelText('From'), 'han');
  expect(screen.getByLabelText('From')).toHaveValue('HAN');
});
// Chạy → LỖI (SearchForm chưa implement) ✓ Đúng lý do

// ---- GREEN: Code tối thiểu để pass ----
function SearchForm({ onSearch }: Props) {
  const [from, setFrom] = useState('');
  return (
    <form>
      <input
        aria-label="From"
        value={from}
        onChange={(e) => setFrom(e.target.value.toUpperCase())}
        maxLength={3}
      />
    </form>
  );
}
// Chạy → PASS ✓ | TẤT CẢ tests → PASS ✓

// ---- REFACTOR: Chỉ khi cần ----
// Extract thành utility? → YAGNI, chỉ dùng ở đây → BỎ QUA
// → COMMIT: "feat(search): SearchForm with IATA auto-uppercase"`,
    tips: [
      'Nếu lỡ viết code trước — XOÁ ĐI và bắt đầu lại với test',
      'Tên test nên mô tả hành vi, không mô tả cách implement',
      'Mỗi test chỉ một assertion giúp xác định lỗi chính xác',
      '"Output sạch" nghĩa là không có warning nào trong output test',
    ],
    redFlags: [
      'Viết code production trước khi có test lỗi',
      'Bỏ qua bước "xác nhận RED"',
      'Viết nhiều tests trước khi implement bất kỳ test nào',
      'Implement nhiều hơn mức cần thiết để pass test',
      'Refactor trước khi xác nhận GREEN',
      'Không chạy TẤT CẢ tests sau mỗi thay đổi',
      'Nói "chắc là pass" mà không chạy thử',
      'Mock mà không hiểu behavior thực tế',
    ],
  },

  'subagent-driven-development': {
    id: 'subagent-driven-development',
    title: 'Subagent-Driven Development',
    subtitle: 'superpowers:subagent-driven-development',
    purpose: 'Recommended execution method. Fresh subagent mỗi task (clean context) + 2-stage review (spec compliance rồi code quality) = high quality code, fast iteration.',
    steps: [
      {
        step: 'Controller đọc plan và tạo danh sách task',
        description: 'Session chính (controller) đọc plan, tạo TodoWrite để theo dõi tiến độ.',
        actions: [
          'Đọc toàn bộ file plan',
          'Tạo TodoWrite liệt kê tất cả tasks',
          'Kiểm tra plan không có lỗ hổng hay mơ hồ',
          'Nếu có vấn đề: báo bạn trước khi bắt đầu',
        ],
      },
      {
        step: 'Giao task cho subagent implementer',
        description: 'Với mỗi task: tạo một subagent MỚI với toàn bộ nội dung task (không gửi link file).',
        actions: [
          'Copy TOÀN BỘ nội dung task vào prompt — không link file plan',
          'Kèm theo ngữ cảnh dự án',
          'Yêu cầu implementer: hỏi trước khi code',
          'Chọn model: rẻ cho 1-2 file, trung bình cho multi-file, mạnh cho kiến trúc',
        ],
      },
      {
        step: 'Xử lý trạng thái từ implementer',
        description: 'Xử lý báo cáo của implementer dựa trên trạng thái.',
        actions: [
          'DONE → chuyển sang review spec',
          'DONE_WITH_CONCERNS → xem xét concerns + review spec',
          'NEEDS_CONTEXT → cung cấp thông tin, giao lại task',
          'BLOCKED → giải quyết blocker hoặc hỏi bạn',
        ],
      },
      {
        step: 'Giao subagent review theo spec',
        description: 'Subagent mới kiểm tra code có đúng spec không. KHÔNG tin báo cáo của implementer — phải đọc code thực.',
        actions: [
          'Reviewer phải ĐỌC file code thực (không tin báo cáo)',
          'Kiểm tra: thiếu yêu cầu, làm thừa, hiểu sai',
          'Kết quả: ✅ Đúng spec hoặc ❌ Có vấn đề kèm file:line',
          'Nếu có lỗi: sửa → review lại. KHÔNG được bỏ qua.',
        ],
      },
      {
        step: 'Giao subagent review chất lượng code',
        description: 'CHỈ SAU KHI review spec đã pass. Subagent mới đánh giá chất lượng code.',
        actions: [
          'Chất lượng code: đặt tên, độ phức tạp, trùng lặp',
          'Kiến trúc: single responsibility, khả năng test',
          'Testing: coverage, anti-patterns, edge cases',
          'Sẵn sàng production: xử lý lỗi, logging',
          'Kết quả: Critical / Important / Minor',
        ],
      },
      {
        step: 'Sửa lỗi và tiếp tục',
        description: 'Sửa các lỗi Critical và Important. Ghi nhận Minor. Chuyển sang task tiếp.',
        actions: [
          'Sửa lỗi Critical ngay lập tức',
          'Sửa lỗi Important trước khi tiếp tục',
          'Ghi nhận lỗi Minor để sửa sau',
          'Đánh dấu task hoàn thành trong TodoWrite',
          'Chuyển sang task tiếp theo',
        ],
      },
    ],
    output: {
      format: 'Code + tests + commits đã được xác nhận bởi 2 reviewer độc lập',
      requiredSections: ['Implementation', 'Spec Review Pass', 'Quality Review Pass', 'Tất cả Tests Green'],
    },
    example: `// ---- Controller giao task cho implementer ----
Prompt: "Implement Task 3: CommunityPostService
  - [ ] Viết test lỗi: createPost() lưu post với hashtag extraction
  - [ ] Implement createPost() — trích xuất #hashtags từ content
  - [ ] Chạy test → GREEN
  Context: NestJS 11, Prisma MongoDB, models đã tạo ở Task 1-2
  Báo cáo: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT"

// ---- Implementer báo cáo ----
Status: DONE
- Đã implement createPost(), getFeed(), toggleLike()
- 6 tests passing, tất cả GREEN
- Self-review: không có concerns
- Committed: "feat(community): add post service"

// ---- Controller giao spec reviewer ----
"Đọc code THỰC TẾ trong community-post.service.ts
 Đối chiếu với Task 3 spec. KHÔNG tin báo cáo implementer."

// ---- Spec reviewer kết quả ----
✅ Đúng spec — tất cả yêu cầu được implement đúng

// ---- Controller giao quality reviewer ----
// (CHỈ SAU KHI spec review pass)
"Review chất lượng code cho các file đã thay đổi..."`,
    tips: [
      'KHÔNG BAO GIỜ gửi link file plan cho subagent — gửi toàn bộ nội dung task',
      'Dùng model rẻ cho task đơn giản 1-2 file để tiết kiệm',
      'Spec review và quality review là 2 subagent RIÊNG BIỆT',
      'Phải chờ spec review pass TRƯỚC KHI giao quality review',
    ],
    redFlags: [
      'Bỏ qua review vì "task này đơn giản"',
      'Tiếp tục khi còn lỗi Critical chưa sửa',
      'Chạy song song nhiều implementer subagents (chỉ một lúc một)',
      'Gửi link file plan thay vì copy nội dung đầy đủ',
      'Chạy quality review trước khi spec review pass',
      'Bỏ qua câu hỏi BLOCKED/NEEDS_CONTEXT từ implementer',
    ],
  },

  'systematic-debugging': {
    id: 'systematic-debugging',
    title: 'Debug Có Hệ Thống',
    subtitle: 'superpowers:systematic-debugging',
    purpose: 'Iron Law: KHÔNG FIX KHI CHƯA TÌM RA ROOT CAUSE. 4 phase bắt buộc. Nếu fix 3+ lần mà vẫn fail → stop, question architecture.',
    steps: [
      {
        step: 'Giai đoạn 1: Điều tra nguyên nhân gốc',
        description: 'Đọc thông báo lỗi CHÍNH XÁC. Tái hiện lỗi ổn định. Truy vết luồng dữ liệu.',
        actions: [
          'Đọc thông báo lỗi từng chữ — KHÔNG đoán',
          'Tái hiện bug ổn định với các bước cụ thể',
          'Kiểm tra thay đổi gần đây: git log, git diff',
          'Thêm logging/instrumentation tại MỖI ranh giới',
          'Truy vết luồng dữ liệu từ entry point đến điểm lỗi',
        ],
      },
      {
        step: 'Giai đoạn 2: Phân tích mẫu',
        description: 'Tìm code hoạt động đúng tương tự. So sánh với code lỗi. Xác định khác biệt.',
        actions: [
          'Tìm code HOẠT ĐỘNG ĐÚNG tương tự trong codebase',
          'Đọc code đúng TOÀN BỘ — không lướt qua',
          'So sánh code đúng vs code lỗi: xác định TẤT CẢ khác biệt',
          'Lập sơ đồ chuỗi dependency',
          'Hiểu TẠI SAO code đúng hoạt động được',
        ],
      },
      {
        step: 'Giai đoạn 3: Giả thuyết và Kiểm chứng',
        description: 'Đặt MỘT giả thuyết. Kiểm tra MỘT biến. Xác nhận trước khi tiếp tục.',
        actions: [
          'Đặt MỘT giả thuyết duy nhất dựa trên bằng chứng',
          'Kiểm tra MỘT biến tại một thời điểm — không sửa nhiều thứ cùng lúc',
          'Xác nhận giả thuyết trước khi chuyển sang implement',
          'Nói "tôi chưa biết" khi thực sự chưa rõ',
          'Nếu sửa 3+ lần thất bại → DỪNG → Xem xét lại kiến trúc',
        ],
      },
      {
        step: 'Giai đoạn 4: Triển khai sửa lỗi',
        description: 'Tạo test case tái hiện bug TRƯỚC (TDD!). Sửa một lỗi duy nhất. Xác nhận tất cả tests pass.',
        actions: [
          'Viết test case tái hiện đúng bug đó',
          'Triển khai MỘT bản sửa duy nhất — không sửa nhiều thứ',
          'Chạy test bug → bây giờ pass',
          'Chạy TẤT CẢ tests → tất cả vẫn pass',
          'Áp dụng defense in depth: validate ở MỖI lớp',
        ],
      },
    ],
    output: {
      format: 'Bản sửa lỗi có test chứng minh + tất cả regression tests pass',
      requiredSections: ['Nguyên nhân gốc', 'Test tái hiện bug', 'Bản sửa', 'Tất cả Tests Green'],
    },
    example: `// Giai đoạn 1: Đọc lỗi chính xác
Error: "Cannot read property 'name' of undefined"
  at UserService.getProfile (user.service.ts:45)
  at UserController.profile (user.controller.ts:23)

// Giai đoạn 2: So sánh với code đúng
// Code đúng: getUser() luôn kiểm tra user tồn tại
// Code lỗi: getProfile() giả định user luôn có

// Giai đoạn 3: Giả thuyết
// userId từ JWT có thể không tồn tại trong DB (user đã bị xoá)
// Kiểm chứng: gọi getProfile với userId không tồn tại

// Giai đoạn 4: TDD sửa lỗi
it('should return 404 for deleted user', async () => {
  const res = await request(app).get('/profile')
    .set('Authorization', 'Bearer <deleted-user-token>');
  expect(res.status).toBe(404);
});
// RED ✓ → Sửa: thêm null check → GREEN ✓ → Tất cả tests PASS ✓`,
    tips: [
      'Đọc lỗi CHÍNH XÁC — câu trả lời thường nằm ngay trong thông báo lỗi',
      'Thêm console.error với stack traces tại các ranh giới module',
      'So sánh code đúng vs lỗi — đọc TOÀN BỘ, không lướt',
      'Sau 3 lần sửa thất bại: vấn đề có thể ở kiến trúc, không phải bug đơn giản',
    ],
    redFlags: [
      'Đề xuất sửa trước khi hoàn thành Giai đoạn 1',
      'Nhảy thẳng đến Giai đoạn 4 vì "rõ ràng rồi"',
      'Sửa nhiều thứ cùng lúc thay vì kiểm tra từng biến',
      'Đoán thay vì đọc thông báo lỗi thực tế',
      'Không viết test tái hiện bug trước khi sửa',
      'Tiếp tục sau 3+ lần sửa thất bại mà không xem xét kiến trúc',
    ],
  },

  'executing-plans': {
    id: 'executing-plans',
    title: 'Thực Thi Plan Tuần Tự',
    subtitle: 'superpowers:executing-plans',
    purpose: 'Execute plan trong single session, chạy từng task sequential. Fallback khi không có subagent. Gặp blocker thì stop ngay — không bao giờ guess.',
    steps: [
      {
        step: 'Đọc và review plan',
        description: 'Đọc toàn bộ plan. Phát hiện vấn đề. Tạo danh sách task hoặc báo lỗi.',
        actions: [
          'Đọc file plan từ đầu đến cuối',
          'Kiểm tra lỗ hổng, mơ hồ, dependency thiếu',
          'Tạo TodoWrite liệt kê tất cả tasks',
          'Báo vấn đề cho bạn trước khi bắt đầu',
        ],
      },
      {
        step: 'Thực thi từng task theo thứ tự',
        description: 'Với mỗi task: đánh dấu đang làm, thực hiện đúng các bước, xác nhận, đánh dấu hoàn thành.',
        actions: [
          'Đánh dấu task là in_progress trong TodoWrite',
          'Thực hiện chính xác từng bước trong task',
          'Chạy chu kỳ TDD: Red → Green → Refactor → Commit',
          'Xác nhận tất cả tests pass sau mỗi task',
          'Đánh dấu task hoàn thành',
        ],
      },
      {
        step: 'Xử lý khi bị chặn',
        description: 'Nếu gặp blocker, dừng ngay. KHÔNG đoán hoặc tự giải quyết.',
        actions: [
          'DỪNG khi: blocker, thiếu dependency, test lỗi, hướng dẫn không rõ',
          'Hỏi bạn để làm rõ thay vì tự đoán',
          'Nếu plan có lỗ hổng nghiêm trọng, báo trước khi tiếp',
          'Ghi lại đã thử gì và kết quả thế nào',
        ],
      },
      {
        step: 'Hoàn thành',
        description: 'Sau khi tất cả tasks hoàn thành, chuyển sang finishing-a-development-branch.',
        actions: [
          'Xác nhận TẤT CẢ tests pass lần cuối',
          'Gọi skill finishing-a-development-branch',
        ],
      },
    ],
    output: {
      format: 'Tất cả tasks trong plan hoàn thành với tests pass',
      requiredSections: ['Tất cả tasks hoàn thành', 'Tất cả tests green', 'Sẵn sàng finish'],
    },
    tips: [
      'Khuyến nghị: dùng subagent-driven-development thay thế nếu có subagent',
      'Gặp blocker thì dừng — không đoán',
      'Chạy TẤT CẢ tests sau mỗi task, không chỉ test mới',
    ],
    redFlags: [
      'Tự đoán khi bị chặn thay vì hỏi',
      'Bỏ qua bước xác nhận test',
      'Thực hiện thay đổi ngoài plan',
      'Tiếp tục sau khi test lỗi',
    ],
  },

  'requesting-code-review': {
    id: 'requesting-code-review',
    title: 'Yêu Cầu Code Review',
    subtitle: 'superpowers:requesting-code-review',
    purpose: 'Review sớm, review thường xuyên. Dispatch reviewer subagent check code quality, architecture, testing, và requirements alignment.',
    steps: [
      {
        step: 'Lấy git SHAs',
        description: 'Xác định commit gốc và commit mới nhất cho phạm vi review.',
        actions: [
          'Lấy BASE_SHA: commit trước khi bắt đầu thay đổi',
          'Lấy HEAD_SHA: commit mới nhất có thay đổi',
          'Xác nhận diff bao gồm tất cả thay đổi dự định',
        ],
      },
      {
        step: 'Giao subagent code-reviewer',
        description: 'Sử dụng template code-reviewer với thông tin đã điền.',
        actions: [
          'Điền template: đã implement gì, yêu cầu/plan là gì',
          'Điền template: BASE_SHA, HEAD_SHA, mô tả',
          'Giao cho subagent sử dụng agent code-reviewer',
        ],
      },
      {
        step: 'Xử lý kết quả review',
        description: 'Phân loại và xử lý phản hồi theo mức độ nghiêm trọng.',
        actions: [
          'Lỗi Critical → sửa NGAY LẬP TỨC, trước mọi việc khác',
          'Lỗi Important → sửa trước khi chuyển sang task tiếp',
          'Lỗi Minor / Gợi ý → ghi nhận hoặc sửa nếu nhanh',
        ],
      },
    ],
    output: {
      format: 'Báo cáo review với lỗi phân loại theo mức độ (Critical/Important/Minor)',
      requiredSections: ['Điểm mạnh', 'Lỗi theo mức độ', 'Khuyến nghị', 'Đánh giá tổng quan'],
    },
    tips: [
      'Review BẮT BUỘC sau mỗi task SDD, sau tính năng lớn, trước khi merge',
      'Không được bỏ qua review vì "thay đổi đơn giản"',
      'Lỗi Critical phải sửa trước khi làm bất cứ gì khác',
    ],
    redFlags: [
      'Bỏ qua review vì thay đổi "nhìn đơn giản"',
      'Bỏ qua lỗi Critical',
      'Không review lại sau khi sửa lỗi Critical/Important',
    ],
  },

  'receiving-code-review': {
    id: 'receiving-code-review',
    title: 'Nhận Code Review',
    subtitle: 'superpowers:receiving-code-review',
    purpose: 'Verify trước khi implement feedback. Hỏi trước khi assume. Technical correctness > social comfort. CẤM nói "You\'re absolutely right!" trước khi verify.',
    steps: [
      {
        step: 'ĐỌC — Hiểu toàn bộ feedback',
        description: 'Đọc TẤT CẢ feedback trước khi hành động.',
        actions: [
          'Đọc từng comment/issue đầy đủ',
          'Phân loại: câu hỏi vs gợi ý vs yêu cầu',
          'Đánh dấu những điểm chưa rõ',
        ],
      },
      {
        step: 'HIỂU — Làm rõ điểm chưa rõ',
        description: 'Nếu BẤT KỲ feedback nào chưa rõ, DỪNG lại và hỏi tất cả điểm chưa rõ trước.',
        actions: [
          'Liệt kê tất cả điểm chưa rõ',
          'Đặt câu hỏi cụ thể để làm rõ',
          'Chờ câu trả lời trước khi thực hiện',
          'KHÔNG bắt đầu implement feedback chưa rõ ràng',
        ],
      },
      {
        step: 'KIỂM CHỨNG — Đối chiếu với code thực tế',
        description: 'Kiểm tra các khẳng định trong feedback với codebase thực trước khi đồng ý.',
        actions: [
          'Reviewer nói "X đã tồn tại" → grep tìm X, xác nhận',
          'Reviewer đề xuất pattern → kiểm tra codebase có dùng pattern đó không',
          'Reviewer nói code không dùng → xác nhận thực sự không dùng',
          'Kiểm tra YAGNI: nếu gợi ý thêm tính năng "chuyên nghiệp" → grep xem có cần không',
        ],
      },
      {
        step: 'ĐÁNH GIÁ — Quyết định làm gì',
        description: 'Dựa trên kiểm chứng, quyết định implement, phản đối, hoặc thảo luận.',
        actions: [
          'Implement: feedback đúng và cải thiện code',
          'Phản đối: feedback sai, reviewer thiếu context, hoặc vi phạm YAGNI',
          'Thảo luận: feedback gây tranh cãi, cần thêm ý kiến',
        ],
      },
      {
        step: 'TRẢ LỜI — Giao tiếp rõ ràng',
        description: 'Trả lời từng feedback item với quyết định và lý do.',
        actions: [
          'Giải thích lý do cho mỗi quyết định',
          'Nói thẳng: "Không cần vì X" thay vì "Ý hay nhưng..."',
          'Không dùng lời cảm ơn hình thức trước khi kiểm chứng',
        ],
      },
      {
        step: 'THỰC HIỆN — Từng cái một',
        description: 'Implement các feedback đã chấp nhận, từng cái một, có kiểm chứng.',
        actions: [
          'Implement từng feedback item một lúc một',
          'Chạy tests sau mỗi thay đổi',
          'Commit với tham chiếu đến review comment',
        ],
      },
    ],
    output: {
      format: 'Phản hồi cho tất cả feedback + các bản sửa đã implement với tests',
      requiredSections: ['Phản hồi feedback', 'Thay đổi đã thực hiện', 'Tests vẫn Green'],
    },
    tips: [
      'KIỂM CHỨNG trước khi đồng ý — đối chiếu với code thực',
      'Phản đối khi feedback sai — đúng kỹ thuật > lịch sự',
      'Kiểm tra YAGNI: grep codebase trước khi thêm tính năng "chuyên nghiệp"',
    ],
    redFlags: [
      'Nói "Bạn hoàn toàn đúng!" trước khi kiểm chứng',
      'Implement tất cả feedback mà không kiểm tra code thực tế',
      'Thêm tính năng vì reviewer nói "nên có" mà không kiểm tra YAGNI',
      'Bày tỏ lòng biết ơn trước khi kiểm chứng kỹ thuật',
      'Implement nhiều feedback items cùng lúc',
    ],
  },

  'verification-before-completion': {
    id: 'verification-before-completion',
    title: 'Xác Nhận Trước Khi Hoàn Thành',
    subtitle: 'superpowers:verification-before-completion',
    purpose: 'Iron Law: KHÔNG CLAIM "DONE" KHI CHƯA CÓ FRESH VERIFICATION EVIDENCE. Run command, đọc output, verify — rồi mới được claim.',
    steps: [
      {
        step: 'XÁC ĐỊNH lệnh cần chạy',
        description: 'Xác định lệnh nào chứng minh được điều bạn sắp tuyên bố.',
        actions: [
          '"Tests pass" → xác định lệnh chạy test',
          '"Build thành công" → xác định lệnh build',
          '"Tính năng hoạt động" → xác định cách kiểm tra hành vi',
          '"Đáp ứng yêu cầu" → xác định acceptance criteria',
        ],
      },
      {
        step: 'CHẠY lệnh (đầy đủ, mới)',
        description: 'Thực thi lệnh xác nhận. Chạy đầy đủ, không dùng cache.',
        actions: [
          'Chạy lệnh ĐẦY ĐỦ — không chỉ một phần',
          'Chạy MỚI — không dựa vào kết quả cache',
          'Để lệnh chạy xong — không dừng sớm',
        ],
      },
      {
        step: 'ĐỌC output',
        description: 'Đọc toàn bộ output lệnh. Từng dòng.',
        actions: [
          'Đọc TOÀN BỘ output — không lướt qua',
          'Kiểm tra warnings, deprecations, errors',
          'Xác nhận con số đúng với kỳ vọng (số test, v.v.)',
        ],
      },
      {
        step: 'XÁC NHẬN — Rồi mới tuyên bố',
        description: 'Chỉ sau khi đọc output và xác nhận thành công, mới được tuyên bố.',
        actions: [
          'Output thành công → tuyên bố',
          'Output lỗi → sửa, KHÔNG tuyên bố thành công',
          'Output có warning → điều tra, rồi quyết định',
          'KHÔNG BAO GIỜ dùng "chắc là", "có lẽ", "có vẻ" ',
        ],
      },
    ],
    output: {
      format: 'Tuyên bố dựa trên bằng chứng với output lệnh thực tế',
      requiredSections: ['Lệnh đã chạy', 'Output quan sát được', 'Tuyên bố đã xác nhận'],
    },
    tips: [
      'Áp dụng cho MỌI tuyên bố: "đã sửa", "pass", "hoàn thành", "hoạt động"',
      'Kết quả cache không phải bằng chứng mới — phải chạy lại',
      'Nếu thấy mình sắp nói "chắc là pass" — DỪNG, chạy lệnh',
    ],
    redFlags: [
      'Tuyên bố "tests pass" mà không chạy',
      'Dùng "chắc là", "có lẽ", "có vẻ" trong tuyên bố hoàn thành',
      'Dựa vào kết quả test cũ hoặc cache',
      'Thể hiện hài lòng trước khi chạy lệnh xác nhận',
      'Tuyên bố hoàn thành mà không đọc toàn bộ output',
    ],
  },

  'using-git-worktrees': {
    id: 'using-git-worktrees',
    title: 'Sử Dụng Git Worktrees',
    subtitle: 'superpowers:using-git-worktrees',
    purpose: 'Tạo isolated git worktree cho feature development. Systematic directory selection + safety verification = reliable isolation.',
    steps: [
      {
        step: 'Chọn thư mục worktree',
        description: 'Theo thứ tự ưu tiên để chọn thư mục đặt worktree.',
        actions: [
          '1. Kiểm tra thư mục .worktrees/ hoặc worktrees/ đã có',
          '2. Nếu cả hai tồn tại, .worktrees ưu tiên hơn',
          '3. Kiểm tra CLAUDE.md có ghi ưu tiên nào không',
          '4. Hỏi bạn: trong project (.worktrees/) hay global (~/.config/superpowers/worktrees/)',
        ],
      },
      {
        step: 'Kiểm tra an toàn',
        description: 'Với thư mục trong project, kiểm tra .gitignore đã cover thư mục worktree.',
        actions: [
          'Chạy: git check-ignore -q <thư-mục-worktree>',
          'Nếu CHƯA ignore: thêm vào .gitignore + commit TRƯỚC',
          'KHÔNG BAO GIỜ tạo worktree trong thư mục đang tracked',
        ],
      },
      {
        step: 'Tạo worktree',
        description: 'Tạo worktree với branch mới, cài dependencies, xác nhận baseline sạch.',
        actions: [
          'Phát hiện tên project từ package.json hoặc thư mục',
          'git worktree add <thư-mục> -b <feature-branch>',
          'Chạy project setup: npm install / pip install / v.v.',
          'Chạy tests để xác nhận baseline sạch (tất cả pass)',
        ],
      },
    ],
    output: {
      format: 'Worktree cách ly sẵn sàng phát triển với baseline sạch',
      requiredSections: ['Đường dẫn Worktree', 'Tên Branch', 'Baseline sạch đã xác nhận'],
    },
    tips: [
      'Luôn kiểm tra .gitignore TRƯỚC KHI tạo worktree trong project',
      'Chạy tests trong worktree để xác nhận baseline sạch trước khi bắt đầu',
      'Kết hợp với: finishing-a-development-branch để dọn dẹp',
    ],
    redFlags: [
      'Tạo worktree trong thư mục đang tracked bởi git',
      'Bỏ qua kiểm tra .gitignore',
      'Không chạy project setup trong worktree mới',
      'Không xác nhận baseline sạch trước khi bắt đầu',
    ],
  },

  'finishing-a-development-branch': {
    id: 'finishing-a-development-branch',
    title: 'Hoàn Thành Nhánh Phát Triển',
    subtitle: 'superpowers:finishing-a-development-branch',
    purpose: 'Verify tests pass → Present đúng 4 options → Execute choice → Cleanup. Không surprises.',
    steps: [
      {
        step: 'Xác nhận tất cả tests pass',
        description: 'Chạy toàn bộ test suite. Nếu BẤT KỲ test nào lỗi, dừng lại và báo.',
        actions: [
          'Chạy toàn bộ test suite',
          'Nếu có lỗi: dừng, hiển thị lỗi, KHÔNG tiếp tục',
          'Tất cả green → tiếp tục đưa lựa chọn',
        ],
      },
      {
        step: 'Xác định nhánh gốc',
        description: 'Xác định nhánh nào sẽ merge vào hoặc tạo PR hướng tới.',
        actions: [
          'Kiểm tra git config cho nhánh mặc định (main/master/develop)',
          'Xác nhận với bạn nếu không rõ',
        ],
      },
      {
        step: 'Đưa ra đúng 4 lựa chọn',
        description: 'Trình bày rõ ràng 4 lựa chọn. Bạn chọn một.',
        actions: [
          '[1] Merge local — merge vào nhánh gốc, không tạo PR',
          '[2] Push & PR — push nhánh, tạo pull request',
          '[3] Giữ nguyên — để worktree lại để tiếp tục sau',
          '[4] Huỷ bỏ — xoá toàn bộ code (phải gõ "discard" để xác nhận)',
        ],
      },
      {
        step: 'Thực hiện và dọn dẹp',
        description: 'Thực hiện lựa chọn đã chọn. Dọn dẹp worktree cho lựa chọn 1 & 4.',
        actions: [
          'Lựa chọn 1: git checkout gốc && git merge feature-branch',
          'Lựa chọn 2: git push -u origin feature-branch && gh pr create',
          'Lựa chọn 3: báo đường dẫn worktree, giữ nguyên',
          'Lựa chọn 4: yêu cầu gõ "discard" xác nhận, rồi xoá',
          'Dọn dẹp worktree cho lựa chọn 1 & 4',
        ],
      },
    ],
    output: {
      format: 'Nhánh đã tích hợp hoặc giữ lại theo lựa chọn của bạn',
      requiredSections: ['Tests đã xác nhận', 'Lựa chọn đã chọn', 'Kết quả thực hiện'],
    },
    tips: [
      'LUÔN xác nhận tests trước khi đưa lựa chọn',
      'Lựa chọn 4 (huỷ) yêu cầu gõ xác nhận — không tự huỷ',
      'Báo đường dẫn worktree cho lựa chọn 3 để bạn quay lại sau',
    ],
    redFlags: [
      'Tiếp tục khi tests còn lỗi',
      'Tự chọn lựa chọn mà không hỏi bạn',
      'Huỷ code mà không có xác nhận bằng chữ',
      'Không dọn dẹp worktree sau merge hoặc huỷ',
    ],
  },

  'dispatching-parallel-agents': {
    id: 'dispatching-parallel-agents',
    title: 'Chạy Song Song Nhiều Agents',
    subtitle: 'superpowers:dispatching-parallel-agents',
    purpose: 'Dispatch mỗi agent một independent problem domain. Chạy concurrent. Chỉ dùng khi 2+ tasks KHÔNG có shared state hoặc sequential dependencies.',
    steps: [
      {
        step: 'Xác định các phần độc lập',
        description: 'Xác nhận các tasks thực sự độc lập — không shared state, không phụ thuộc tuần tự.',
        actions: [
          '3+ file test lỗi với nguyên nhân khác nhau',
          'Nhiều hệ thống con hỏng độc lập',
          'Tasks chạm vào hoàn toàn các file/module khác nhau',
          'KHÔNG BAO GIỜ chạy song song tasks có shared state',
        ],
      },
      {
        step: 'Tạo task tập trung cho mỗi agent',
        description: 'Mỗi agent nhận task cụ thể, độc lập, có phạm vi rõ ràng.',
        actions: [
          'Phạm vi cụ thể — chính xác cần điều tra hoặc sửa gì',
          'Mục tiêu rõ ràng — "hoàn thành" trông như thế nào',
          'Ràng buộc — KHÔNG được đụng vào gì',
          'Định dạng output mong muốn',
        ],
      },
      {
        step: 'Giao tất cả cùng lúc',
        description: 'Gửi tất cả Agent tool calls trong MỘT tin nhắn để chạy song song thực sự.',
        actions: [
          'Tất cả Agent tool calls trong MỘT tin nhắn',
          'Mỗi prompt tập trung, độc lập',
          'Kèm đầy đủ context cần thiết trong mỗi prompt',
        ],
      },
      {
        step: 'Review và tích hợp',
        description: 'Sau khi agents hoàn thành, review kết quả và tích hợp.',
        actions: [
          'Review tóm tắt của mỗi agent',
          'Kiểm tra xung đột giữa các thay đổi',
          'Chạy toàn bộ test suite',
          'Spot check các thay đổi quan trọng',
        ],
      },
    ],
    output: {
      format: 'Nhiều tasks độc lập hoàn thành song song',
      requiredSections: ['Kết quả từng Agent', 'Kiểm tra xung đột', 'Toàn bộ Test Suite Pass'],
    },
    tips: [
      'Chỉ dùng khi tasks thực sự độc lập — không shared files hoặc state',
      'Agent prompt tốt: tập trung, độc lập, cụ thể về output',
      'Luôn chạy toàn bộ test suite sau khi tích hợp tất cả kết quả',
    ],
    redFlags: [
      'Chạy song song tasks có shared state hoặc files',
      'Agent prompt quá rộng hoặc mơ hồ',
      'Không kiểm tra xung đột giữa các thay đổi',
      'Không chạy toàn bộ test suite sau tích hợp',
    ],
  },

// ===== TDD Phase-specific details =====
  'tdd-red': {
    id: 'tdd-red',
    title: 'RED — Viết Failing Test',
    subtitle: 'TDD Phase 1',
    purpose: 'Viết đúng MỘT test kiểm tra MỘT hành vi. Test phải fail vì đúng lý do — nghĩa là feature chưa được implement, không phải vì syntax error.',
    steps: [
      { step: 'Viết MỘT test duy nhất', description: 'Chỉ test một hành vi cụ thể. Tên mô tả rõ ràng.', actions: ['Chỉ test MỘT hành vi — không gộp nhiều scenario', 'Đặt tên mô tả: "should extract hashtags from content"', 'Dùng real code, real types — không pseudo-code', 'Assertion tối thiểu — thứ nhỏ nhất có thể fail'] },
      { step: 'Chạy test — XÁC NHẬN fail', description: 'Bắt buộc chạy test và confirm nó fail đúng lý do.', actions: ['Chạy lệnh test', 'Confirm test FAIL (không phải pass, không phải error)', 'Verify lý do fail đúng (VD: "function not found" không phải "syntax error")', 'Nếu fail sai lý do → sửa test trước'] },
    ],
    output: { format: 'Một failing test sẵn sàng để implement', requiredSections: ['Test file', 'Test output confirm RED'] },
    example: `// Viết test
it('should extract hashtags from content', async () => {
  const post = await service.createPost(userId, {
    content: 'Job #react #typescript',
    visibility: PostVisibility.PUBLIC,
  });
  expect(post.hashtags).toEqual(['react', 'typescript']);
});

// Chạy → FAIL: createPost is not a function
// ✓ Đúng lý do — function chưa implement`,
    tips: ['Test name mô tả behavior, không mô tả implementation', 'Một assertion per test giúp xác định lỗi chính xác', 'Nếu lỡ viết code trước — XOÁ code, viết test trước'],
    redFlags: ['Viết code production trước test', 'Viết nhiều tests cùng lúc trước khi implement', 'Test fail vì syntax error thay vì missing implementation'],
  },

  'tdd-green': {
    id: 'tdd-green',
    title: 'GREEN — Code Tối Thiểu Để Pass',
    subtitle: 'TDD Phase 2',
    purpose: 'Viết lượng code ít nhất, đơn giản nhất để test vừa viết pass. Không thêm tính năng, không refactor, không "tiện thể" cải thiện. Chỉ cần pass.',
    steps: [
      { step: 'Viết code ĐƠN GIẢN NHẤT', description: 'Implementation tối thiểu. Hard-code nếu cần.', actions: ['Cách triển khai đơn giản nhất có thể', 'Không thêm extra features', 'Không refactor — chỉ cần pass', 'Hard-code nếu đó là cách nhanh nhất (refactor sau)'] },
      { step: 'Chạy test — XÁC NHẬN pass', description: 'Chạy test vừa viết + ALL tests. Output phải clean.', actions: ['Chạy test vừa viết → confirm PASS', 'Chạy TẤT CẢ tests → confirm ALL pass', 'Check output CLEAN (không warning)', 'Nếu test nào fail → sửa trước khi tiếp'] },
    ],
    output: { format: 'Code production minimal + all tests green', requiredSections: ['Implementation', 'Test output confirm GREEN', 'All tests pass'] },
    example: `// Code tối thiểu để pass
async createPost(userId: string, dto: CreateCommunityPostDto) {
  const hashtags = dto.content
    .match(/#(\\w+)/g)?.map(t => t.slice(1)) ?? [];
  return this.prisma.communityPost.create({
    data: { authorId: userId, ...dto, hashtags },
  });
}

// Chạy test → PASS ✓
// Chạy ALL tests → ALL PASS ✓
// Output clean — không warnings`,
    tips: ['SIMPLEST code that passes — resist thêm features', '"Output clean" = zero warnings trong test output', 'Nếu ALL tests không pass → fix trước khi tiếp'],
    redFlags: ['Implement nhiều hơn mức cần thiết', 'Thêm error handling chưa có test cho nó', 'Refactor trước khi confirm GREEN'],
  },

  'tdd-refactor': {
    id: 'tdd-refactor',
    title: 'REFACTOR — Clean Up Code',
    subtitle: 'TDD Phase 3',
    purpose: 'Cải thiện code quality mà KHÔNG thay đổi behavior. Tests phải luôn green suốt quá trình refactor. Chỉ extract/rename khi thực sự cần — check YAGNI trước.',
    steps: [
      { step: 'Kiểm tra cần refactor không', description: 'YAGNI check — chỉ refactor khi có lý do rõ ràng.', actions: ['Code chỉ dùng 1 chỗ → KHÔNG extract', 'Duplication rõ ràng → extract', 'Tên biến/function chưa rõ → rename', 'Nếu không có gì cần sửa → skip, COMMIT luôn'] },
      { step: 'Refactor từng bước nhỏ', description: 'Mỗi thay đổi nhỏ, chạy test ngay sau.', actions: ['Thay đổi MỘT thứ tại một thời điểm', 'Chạy tests sau MỖI thay đổi', 'Nếu test fail → revert ngay', 'Giữ tests GREEN suốt quá trình'] },
      { step: 'COMMIT', description: 'Commit code với message mô tả, bắt đầu chu kỳ tiếp.', actions: ['Commit: "feat(community): createPost with hashtag extraction"', 'Bắt đầu chu kỳ RED → GREEN → REFACTOR tiếp theo'] },
    ],
    output: { format: 'Clean code + commit + ready for next cycle', requiredSections: ['Code improved (hoặc skip nếu không cần)', 'All tests still GREEN', 'Commit'] },
    tips: ['Refactor là OPTIONAL — skip nếu code đã đủ tốt', 'YAGNI: "mình có thể cần sau" = KHÔNG refactor', 'Mỗi thay đổi refactor phải nhỏ và test ngay'],
    redFlags: ['Refactor trước khi confirm GREEN', 'Extract function chỉ dùng 1 chỗ', 'Thay đổi lớn không chạy test giữa chừng'],
  },

// ===== SDD Phase-specific details =====
  'sdd-controller': {
    id: 'sdd-controller',
    title: 'Controller — Main Session',
    subtitle: 'SDD Phase 1',
    purpose: 'Session chính đọc plan, tạo TodoWrite tracking, và orchestrate toàn bộ quá trình. Controller KHÔNG implement — chỉ dispatch và review.',
    steps: [
      { step: 'Đọc và validate plan', description: 'Đọc toàn bộ plan file, kiểm tra gaps.', actions: ['Đọc plan từ đầu đến cuối', 'Kiểm tra ambiguity, missing dependencies', 'Nếu có vấn đề → báo user trước khi bắt đầu'] },
      { step: 'Tạo TodoWrite', description: 'Liệt kê tất cả tasks từ plan vào TodoWrite.', actions: ['Mỗi task = 1 todo item', 'Đánh dấu in_progress khi dispatch', 'Đánh dấu completed sau khi review pass'] },
      { step: 'Chọn model cho mỗi task', description: 'Dựa trên complexity để chọn model phù hợp.', actions: ['Cheap (haiku): task 1-2 files, mechanical', 'Standard (sonnet): multi-file, integration', 'Capable (opus): architecture, complex review'] },
    ],
    output: { format: 'TodoWrite ready + plan validated', requiredSections: ['Plan đã đọc', 'TodoWrite created', 'Model selection per task'] },
    tips: ['Controller KHÔNG implement code — chỉ orchestrate', 'Luôn validate plan trước khi dispatch task đầu tiên', 'Cheap model cho task đơn giản giúp tiết kiệm cost/time'],
  },

  'sdd-implementer': {
    id: 'sdd-implementer',
    title: 'Implementer — Fresh Subagent',
    subtitle: 'SDD Phase 2',
    purpose: 'Mỗi task giao cho một subagent MỚI (clean context). Implementer nhận full task text, hỏi nếu chưa rõ, implement theo TDD, self-review, rồi report status.',
    steps: [
      { step: 'Nhận task + hỏi clarifying questions', description: 'Đọc task text, hỏi TRƯỚC khi bắt đầu code.', actions: ['Đọc full task text (controller gửi, không link file)', 'Hỏi clarifying questions nếu chưa rõ', 'Không assume — hỏi trước'] },
      { step: 'Implement theo TDD', description: 'Red → Green → Refactor cho mỗi sub-step.', actions: ['Viết failing test → confirm RED', 'Code tối thiểu → confirm GREEN', 'Refactor if needed → COMMIT'] },
      { step: 'Self-review + Report', description: 'Tự review code trước khi report status.', actions: ['Check completeness, quality, testing', 'Report: DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_CONTEXT', 'Nếu BLOCKED: mô tả rõ tại sao'] },
    ],
    output: { format: 'Code + tests + commit + status report', requiredSections: ['Implementation', 'Tests', 'Commit', 'Status (DONE/BLOCKED/...)'] },
    tips: ['Hỏi questions TRƯỚC khi code — không assume', 'Full TDD cycle cho mỗi sub-step', 'Self-review trước khi report DONE'],
    redFlags: ['Bắt đầu code mà không đọc hết task text', 'Skip TDD cycle', 'Report DONE mà chưa self-review'],
  },

  'sdd-spec-review': {
    id: 'sdd-spec-review',
    title: 'Spec Review — Fresh Subagent',
    subtitle: 'SDD Phase 3',
    purpose: 'Subagent MỚI verify implementation đúng spec. KHÔNG tin implementer report — phải đọc actual code. Check: thiếu requirements, làm thừa, hiểu sai.',
    steps: [
      { step: 'Đọc ACTUAL code (không tin report)', description: 'Mở file code thực tế, đọc từng function.', actions: ['ĐỌC code files thực — không dựa vào implementer report', 'So sánh với task spec từng requirement', 'Check từng requirement: implemented? đúng? đủ?'] },
      { step: 'Kiểm tra 3 vấn đề chính', description: 'Missing, extra, misunderstood.', actions: ['Thiếu: requirement nào chưa implement?', 'Thừa: code nào làm ngoài scope?', 'Sai: requirement nào bị hiểu sai?'] },
      { step: 'Output verdict', description: 'Kết quả rõ ràng với file:line nếu có issues.', actions: ['✅ Spec compliant → proceed to quality review', '❌ Issues found → list file:line + issue', 'Nếu issues: implementer fix → re-review'] },
    ],
    output: { format: '✅ Spec compliant hoặc ❌ Issues found', requiredSections: ['Code files đã đọc', 'Verdict', 'Issues (nếu có) với file:line'] },
    tips: ['KHÔNG BAO GIỜ trust implementer report — đọc code thực', 'Phải pass TRƯỚC KHI dispatch quality review', 'Nếu issues → fix → re-review, KHÔNG skip'],
    redFlags: ['Trust implementer report mà không đọc code', 'Skip spec review vì "task đơn giản"', 'Dispatch quality review trước khi spec pass'],
  },

  'sdd-quality-review': {
    id: 'sdd-quality-review',
    title: 'Quality Review — Fresh Subagent',
    subtitle: 'SDD Phase 4',
    purpose: 'CHỈ dispatch SAU KHI spec review pass. Fresh subagent đánh giá code quality, architecture, testing, production readiness. Output phân loại Critical/Important/Minor.',
    steps: [
      { step: 'Review code quality', description: 'Kiểm tra naming, complexity, duplication.', actions: ['Naming conventions đúng project style?', 'Complexity hợp lý? Functions quá dài?', 'Duplication? DRY violations?'] },
      { step: 'Review architecture + testing', description: 'Single responsibility, testability, coverage.', actions: ['Mỗi file/function có single responsibility?', 'Code testable independently?', 'Test coverage đủ? Anti-patterns?', 'Edge cases được test?'] },
      { step: 'Output categorized issues', description: 'Phân loại theo severity.', actions: ['Critical → fix NGAY, block proceed', 'Important → fix trước khi sang task tiếp', 'Minor → note for later hoặc fix nếu nhanh'] },
    ],
    output: { format: 'Review report với issues phân loại', requiredSections: ['Code Quality', 'Architecture', 'Testing', 'Issues: Critical/Important/Minor'] },
    tips: ['CHỈ chạy SAU KHI spec review đã pass', 'Critical issues phải fix trước mọi thứ khác', 'Minor issues có thể note và fix batch sau'],
    redFlags: ['Chạy quality review trước spec review', 'Ignore Critical issues', 'Không re-review sau khi fix Critical'],
  },

// ===== Debug Phase-specific details =====
  'debug-phase-1': {
    id: 'debug-phase-1',
    title: 'Root Cause Investigation',
    subtitle: 'Debug Phase 1',
    purpose: 'Đọc error message CHÍNH XÁC, reproduce bug ổn định, trace data flow. Tìm nơi bug phát sinh, không phải nơi nó biểu hiện.',
    steps: [
      { step: 'Đọc error CHÍNH XÁC', description: 'Đọc từng chữ, không đoán.', actions: ['Đọc full error message + stack trace', 'Note file:line trong stack trace', 'Không guess — đọc chính xác'] },
      { step: 'Reproduce ổn định', description: 'Tìm steps cụ thể để reproduce bug mỗi lần.', actions: ['Xác định exact steps để reproduce', 'Nếu flaky → thêm logging để catch'] },
      { step: 'Trace data flow', description: 'Thêm logging tại mỗi boundary, trace từ entry đến error.', actions: ['Check recent changes: git log, git diff', 'Thêm console.error + stack trace tại boundaries', 'Trace: entry point → middlewares → service → error point'] },
    ],
    output: { format: 'Evidence-based understanding của bug origin', requiredSections: ['Error message chính xác', 'Reproduce steps', 'Data flow trace'] },
    tips: ['Câu trả lời thường nằm ngay trong error message', 'Tìm nơi bug PHÁT SINH, không phải nơi BIỂU HIỆN', 'git blame giúp tìm commit nào introduce bug'],
  },

  'debug-phase-2': {
    id: 'debug-phase-2',
    title: 'Pattern Analysis',
    subtitle: 'Debug Phase 2',
    purpose: 'Tìm code HOẠT ĐỘNG ĐÚNG tương tự trong codebase. So sánh working vs broken để thấy thiếu gì. Đọc TOÀN BỘ, không lướt.',
    steps: [
      { step: 'Tìm working code tương tự', description: 'Grep codebase cho function/pattern tương tự hoạt động đúng.', actions: ['Tìm code cùng pattern nhưng working', 'Đọc code working TOÀN BỘ — không skim'] },
      { step: 'So sánh working vs broken', description: 'Xác định mọi khác biệt.', actions: ['List TẤT CẢ differences', 'Map dependency chain của cả hai', 'Hiểu TẠI SAO working code hoạt động'] },
    ],
    output: { format: 'Differences identified giữa working và broken code', requiredSections: ['Working example', 'Differences list', 'Dependency analysis'] },
    tips: ['Hiểu working code sẽ thấy broken code thiếu gì', 'Đọc TOÀN BỘ working code, không lướt qua', 'Map dependencies giúp thấy missing links'],
  },

  'debug-phase-3': {
    id: 'debug-phase-3',
    title: 'Hypothesis & Testing',
    subtitle: 'Debug Phase 3',
    purpose: 'Đặt MỘT giả thuyết dựa trên evidence. Test MỘT variable tại một thời điểm. Nếu 3+ fixes fail → STOP → Question architecture.',
    steps: [
      { step: 'Đặt MỘT hypothesis', description: 'Dựa trên evidence từ Phase 1+2, không phải guess.', actions: ['MỘT hypothesis duy nhất, cụ thể', 'Dựa trên evidence, không phải intuition', 'Nói "chưa biết" khi chưa đủ evidence'] },
      { step: 'Test MỘT variable', description: 'Thay đổi MỘT thứ, verify kết quả.', actions: ['Chỉ thay đổi MỘT variable', 'Verify hypothesis đúng hay sai', 'Nếu sai → quay lại Phase 1 với info mới'] },
      { step: 'Đánh giá progress', description: 'Nếu 3+ attempts fail, escalate.', actions: ['Count số lần fix đã thử', '3+ fixes fail → STOP', 'Question: vấn đề ở ARCHITECTURE, không phải code'] },
    ],
    output: { format: 'Confirmed hypothesis hoặc escalation', requiredSections: ['Hypothesis', 'Test result', 'Decision: proceed hoặc escalate'] },
    tips: ['MỘT variable tại MỘT thời điểm — không sửa nhiều thứ cùng lúc', '3+ fixes fail là signal rõ ràng: vấn đề architectural', 'Nói "chưa biết" tốt hơn guess sai'],
    redFlags: ['Sửa nhiều thứ cùng lúc', 'Tiếp tục sau 3+ failures', 'Guess thay vì test hypothesis'],
  },

  'debug-phase-4': {
    id: 'debug-phase-4',
    title: 'Implementation',
    subtitle: 'Debug Phase 4',
    purpose: 'Viết failing test reproduce bug TRƯỚC (TDD!). Implement MỘT fix duy nhất. Verify fix pass + all tests pass. Apply defense in depth.',
    steps: [
      { step: 'Viết failing test reproduce bug', description: 'TDD: test phải reproduce đúng bug behavior.', actions: ['Test case reproduce exact bug scenario', 'Run → confirm test FAIL (đúng bug)'] },
      { step: 'Implement MỘT fix', description: 'Single fix — không sửa nhiều thứ.', actions: ['MỘT thay đổi duy nhất', 'Run bug test → PASS', 'Run ALL tests → ALL PASS'] },
      { step: 'Defense in depth', description: 'Validate ở mỗi layer data đi qua.', actions: ['Entry point validation', 'Business logic validation', 'Environment guards', 'Debug instrumentation nếu cần'] },
    ],
    output: { format: 'Bug fix + test chứng minh fix works + all tests green', requiredSections: ['Failing test reproduce bug', 'Fix implementation', 'All tests GREEN'] },
    tips: ['Fix bao gồm cả test chứng minh nó work', 'Defense in depth: validate ở EVERY layer', 'Single fix — nếu cần fix nhiều thứ, mỗi thứ là commit riêng'],
  },
}

export function getSkillDetail(id: string): SkillDetail | undefined {
  return skillDetails[id]
}
