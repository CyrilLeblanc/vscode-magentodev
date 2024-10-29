export type PhpClassTemplateData = {
	namespace: string;
	className: string;
};

export default (data: PhpClassTemplateData) => `<?php

namespace ${data.namespace};

class ${data.className}
{
}
`;
