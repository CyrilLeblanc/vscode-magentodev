export default `<?php

namespace {{namespace}};

use Magento\\Framework\\View\\Element\\Template;
use Magento\\Framework\\View\\Element\\Template\\Context;

class {{className}} extends Template
{
    /**
     * Constructor
     *
     * @param \\Magento\\Framework\\View\\Element\\Template\\Context $context
     * @param array $data
     */
    public function __construct(
        Context $context,
        array $data = []
    ) {
        return parent::__construct($context, $data);
    }
}
`;
